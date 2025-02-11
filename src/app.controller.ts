import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { ConfigModule } from './config/config.module';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('ZM') private readonly userService: UserService,
    @Inject('Config') private readonly config: ConfigModule,
  ) {}

  @Get()
  getHello() {
    // return this.appService.getHello();
    // return this.userService.findAll();
    return this.config;
  }
}
