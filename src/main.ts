/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
// import { VersioningType } from '@nestjs/common';
import {Request, Response, NextFunction } from 'express';
import { join } from "path";
import { NestExpressApplication } from "@nestjs/platform-express";
import { Response as ResponseInterceptor } from './common/response';
import { HttpExceptionFilter } from './common/filter';
import { ValidationPipe } from '@nestjs/common';
import { RoleGuard } from './guard/role.guard';

const whiteList = ['/list', '/upload/album', '/upload/export'];
function middleWareAll(req: Request, res: Response, next: NextFunction) {
  console.log("req.originalUrl ->", req.originalUrl);
  if(whiteList.includes(req.originalUrl)) {
    next();
  } else {
    res.send('只因你太美');
  }
}
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  app.useStaticAssets(join(__dirname,'images'), {
    prefix: '/zm',
  })
  // app.useGlobalGuards(new RoleGuard())
  app.useGlobalInterceptors(new ResponseInterceptor())
  app.useGlobalPipes(new ValidationPipe())
  // app.useGlobalFilters(new HttpExceptionFilter())
  // app.use(middleWareAll)
  // app.enableVersioning({
  //   type: VersioningType.URI,
  // });
  /**
   * 参数配置详解
      secret     生成服务端session 签名 可以理解为加盐
      name     	 生成客户端cookie 的名字 默认 connect.sid
      cookie     设置返回到前端 key 的属性，默认值为{ path: ‘/’, httpOnly: true, secure: false, maxAge: null }。
      rolling	   在每次请求时强行设置 cookie，这将重置 cookie 过期时间(默认:false)
      原文链接：https://blog.csdn.net/qq1195566313/article/details/126327047
   */
  app.use(session({ secret: "zhengmin", name: 'zm.session', rolling: true, cookie: { maxAge: null } }));
  await app.listen(3000);
}
bootstrap();
