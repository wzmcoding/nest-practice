/* eslint-disable prettier/prettier */
import { SetMetadata, createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Role = (role: string[]) => {
    console.log(role, 1)
    return SetMetadata('role', role);
}

// 自定义参数装饰器返回一个url
export const ReqUrl = createParamDecorator((data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest()
    console.log(req.url, 'req.url')
    return req.url
})