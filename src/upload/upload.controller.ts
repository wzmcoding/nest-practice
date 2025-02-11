import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Res,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { join } from 'path';
import { zip } from 'compressing';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post('album')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {
    console.log(file, '<-file');
    return true;
  }
  // 下载图片
  @Get('export')
  download(@Res() res: Response) {
    const url = join(__dirname, '../images/1739252992021.png');
    res.download(url);
  }
  // 使用文件流的方式下载
  @Get('stream')
  async down(@Res() res: Response) {
    const url = join(__dirname, '../images/1739252992021.png');
    const tarStream = new zip.Stream();
    await tarStream.addEntry(url);

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="1739252992021.png"',
    );
    tarStream.pipe(res);
  }
  // 前端接收流
  // const useFetch = async (url: string) => {
  //   const res = await fetch(url).then(res => res.arrayBuffer())
  //   console.log(res)
  //   const a = document.createElement('a')
  //   a.href = URL.createObjectURL(new Blob([res],{
  //     // type:"image/png"
  //   }))
  //   a.download = 'xiaman.zip'
  //   a.click()
  // }
  // const download = () => {
  //   useFetch('http://localhost:3000/upload/stream')
  // }
}
