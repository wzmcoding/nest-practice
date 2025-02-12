/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { GuardService } from './guard.service';
import { GuardController } from './guard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guard } from './entities/guard.entity';

@Module({
  // 注册实体
  imports: [TypeOrmModule.forFeature([Guard])],
  controllers: [GuardController],
  providers: [GuardService],
})
export class GuardModule { }
