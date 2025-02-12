/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class CreateGuardDto {
    @ApiProperty({ description: '姓名', example: 'ZM' })
    name: string;
    @ApiProperty({ description: '年龄', example: 22 })
    age: number;
}
