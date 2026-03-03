import { Body, Controller, Post } from '@nestjs/common'

import z from 'zod'
import { AuthenticateManagerUseCase } from '@/domain/scheduling/application/use-cases/authenticate-manager'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const authentcateBodySchema = z.object({
  email: z.email(),
  password: z.string(),
})

type AuthenticateBodySchema = z.infer<typeof authentcateBodySchema>
@Controller('/sessions')
export class AuthenticateController {
  constructor(private authenticateManager: AuthenticateManagerUseCase) {}

  @Post()
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body

    const result = await this.authenticateManager.execute({ email, password })
    if (result.isFailure()) {
      throw new Error()
    }

    const { accessToken } = result.value

    return {
      accessToken,
    }
  }
}
