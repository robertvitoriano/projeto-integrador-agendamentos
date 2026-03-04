import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe';
import { z } from 'zod';
import { RegisterDoctorUseCase } from '@/domain/scheduling/application/use-cases/register-doctor';

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
  document: z.string(),
});
type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;
@Controller('/accounts')
export class CreateAccountController {
  constructor(private registerDoctorUseCase: RegisterDoctorUseCase) {}
  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    const { email, name, password, document } = body;
    const result = await this.registerDoctorUseCase.execute({
      email,
      name,
      password,
      document,
      crm: '',
    });

    if (result.isFailure()) {
      throw new Error();
    }
  }
}
