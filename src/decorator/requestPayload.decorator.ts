import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { RequestHeaderEnum } from 'src/common/enums/requestHeader.enum';
export const RequestPayload = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.headers[RequestHeaderEnum.AUTHORIZATION]
    }
)