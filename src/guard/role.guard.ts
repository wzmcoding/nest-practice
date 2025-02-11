/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private Reflector: Reflector) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //  guard  使用  Reflector 反射读取 setMetaData的值 去做判断这边例子是从url 判断有没有admin权限
    const admin = this.Reflector.get<string[]>('role', context.getHandler())
    const request = context.switchToHttp().getRequest<Request>()
    console.log(request.query, 'request');
    console.log(admin, 'admin');
    if (admin.includes(request.query.role as string)) {
      return true
    } else {
      return false
    }
  }
}
