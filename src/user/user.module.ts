import {
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserService2 } from './user.service2';
import { UserService3 } from './user.service3';
import { Logger } from '../middleware';

// 给 user 模块添加 @Global() 他便注册为全局模块
@Global()
@Module({
  controllers: [UserController],
  // providers: [UserService],
  providers: [
    {
      provide: 'ZM',
      useClass: UserService,
    },
    // 自定义注入值  通过 useValue
    {
      provide: 'JD',
      useValue: ['TB', 'PDD', 'JD'],
    },
    // 如果服务 之间有相互的依赖 或者逻辑处理 可以使用 useFactory
    UserService2,
    {
      provide: 'Test',
      inject: [UserService2],
      useFactory: (userService2: UserService2) => {
        return new UserService3(userService2);
      },
    },
    // 异步模式
    // useFactory 返回一个promise 或者其他异步操作
    {
      provide: 'async',
      async useFactory() {
        return await new Promise((r) => {
          setTimeout(() => {
            r('async');
          }, 3000);
        });
      },
    },
  ],
  exports: [
    {
      provide: 'ZM',
      useClass: UserService,
    },
  ],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(Logger).forRoutes('user');
    // consumer
    //   .apply(Logger)
    //   .forRoutes({ path: 'user', method: RequestMethod.GET });
    consumer.apply(Logger).forRoutes(UserController);
  }
}
