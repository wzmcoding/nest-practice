/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GuardService } from './guard.service';
import { CreateGuardDto } from './dto/create-guard.dto';
import { UpdateGuardDto } from './dto/update-guard.dto';
import { RoleGuard } from './role.guard';
import { ReqUrl, Role } from './role.decorator';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('guard')
@ApiTags('守卫')
@ApiBearerAuth()
@UseGuards(RoleGuard)
export class GuardController {
  constructor(private readonly guardService: GuardService) { }

  @Post()
  create(@Body() createGuardDto: CreateGuardDto) {
    return this.guardService.create(createGuardDto);
  }

  @Get()
  // @SetMetadata('role', ['admin'])
  @Role(['admin'])
  @ApiOperation({summary:"测试admin",description:"请求该接口需要amdin权限"})
  @ApiParam({name:"id",description:"用户id",required:true})
  @ApiQuery({name:"xxxx",description:"bbb"})
  @ApiResponse({status:403,description:"自定义返回信息"})
  findAll(@ReqUrl() url: string) {
    console.log(url, 'url')
    return this.guardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuardDto: UpdateGuardDto) {
    return this.guardService.update(+id, updateGuardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guardService.remove(+id);
  }
}
