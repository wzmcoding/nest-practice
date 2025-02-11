import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DemoModule } from './demo/demo.module';
import { ListModule } from './list/list.module';
import { ConfigModule } from './config/config.module';
import { UploadModule } from './upload/upload.module';
import { PModule } from './p/p.module';

@Module({
  imports: [
    UserModule,
    DemoModule,
    ListModule,
    ConfigModule.forRoot({ path: '/zm' }),
    UploadModule,
    PModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
