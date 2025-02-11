/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator'
export class CreatePDto {
    @IsNotEmpty({ message: '姓名不能为空' }) // 非空
    @IsString({ message: '姓名必须是字符串' }) // 字符串
    name: string
    @IsOptional() // 可选
    @IsNumber() // 数字
    age: number
}

