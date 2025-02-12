/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Req, Res, Inject } from "@nestjs/common";
import { UserService } from './user.service';
import * as svgCaptcha from 'svg-captcha';

@Controller('user')
export class UserController {
  // 自定义名称之后 需要用对应的Inject 取 不然会找不到的
  constructor(@Inject('ZM') private readonly userService: UserService,@Inject('JD') private shopList: string[],
  @Inject('Test') private readonly Test: any) { }

  @Get()
  findAll() {
    console.log("shopList ->", this.shopList);
    console.log("Test ->", this.Test);
    return this.userService.findAll() + this.shopList + this.Test.constructor.name;
  }

  @Get('code')
  createCaptcha(@Req() req, @Res() res) {
    const captcha  = svgCaptcha.create({
      size: 4,//生成几个验证码
      fontSize: 50, //文字大小
      width: 100,  //宽度
      height: 34,  //高度
      background: '#cc9966',  //背景颜色
    });
    console.log("captcha.text ->", captcha.text);
    req.session.code = captcha.text //存储验证码记录到session
    res.type('image/svg+xml');
    res.send(captcha.data);
  }

  @Post('create')
  createUser(@Req() req, @Body() body) {
    console.log("req.session.code ->", req.session.code);
    console.log("body.code ->", body.code, body);
    if (req.session.code.toLocaleLowerCase() === body?.code?.toLocaleLowerCase()) {
      return {
        message: "验证码正确"
      }
    } else {
      return {
        message: "验证码错误"
      }
    }
  }
}
