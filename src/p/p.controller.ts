/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PService } from './p.service';
import { CreatePDto } from './dto/create-p.dto';
import { UpdatePDto } from './dto/update-p.dto';
import * as uuid from 'uuid';
import { PPipe } from './p.pipe';
console.log(uuid.v4(), 'uuid-v4');
@Controller('p')
export class PController {
  constructor(private readonly pService: PService) { }

  @Post()
  create(@Body(PPipe) createPDto: CreatePDto) {
    return this.pService.create(createPDto);
  }

  @Get()
  findAll() {
    return this.pService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.pService.findOne(id);
  // }
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.pService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePDto: UpdatePDto) {
    return this.pService.update(+id, updatePDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pService.remove(+id);
  }
}
