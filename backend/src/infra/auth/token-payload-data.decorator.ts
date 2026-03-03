import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { TokenPayload } from './jwt.strategy'

export const TokenPayloadData = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()

    return request.user as TokenPayload
  },
)
