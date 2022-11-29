import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { RequestHeaderEnum } from 'src/common/enums/request-header.enum';
export const RequestPayload = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.headers[RequestHeaderEnum.Authorization]
    }
)