/* eslint-disable prettier/prettier */
import { ArgumentMetadata, Injectable, PipeTransform, HttpException, HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

@Injectable()
export class PPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const DTO = plainToInstance(metadata.metatype, value)
    console.log(DTO, 'DTO');
    const errors = await validate(DTO)
    if (errors.length > 0) {
      console.log(errors, 'errors');
      throw new HttpException(errors, HttpStatus.BAD_REQUEST)
    }
    return value;
  }
}
