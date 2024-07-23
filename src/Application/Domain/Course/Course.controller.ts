import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ReadLessonService } from './UseCases/ReadVideo/ReadVideo.service';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadVideoService } from './UseCases/UploadVideo/UploadService.service';

type CreateResponseHeaderProps = {
  module: string;
  lesson: string;
  range: string;
};

@Controller('lesson')
export class CourseController {
  constructor(
    private readonly readLessonService: ReadLessonService,
    private readonly uploadVideoService: UploadVideoService,
  ) {}

  @Get(':module/:lesson')
  async exampleLesson(
    @Req() request: Request,
    @Res() response: Response,
    @Param('module') module: string,
    @Param('lesson') lesson: string,
  ) {
    const range = request.headers.range;
    const nameId = lesson;

    if (!nameId) {
      throw new BadRequestException('Require the video name id');
    }

    if (!range) {
      throw new BadRequestException('Requires Range header');
    }

    const { headers, interval } = this.createResponseHeader({
      module,
      lesson,
      range,
    });

    response.writeHead(206, headers);

    const stream = await this.readLessonService.execute(module, lesson, {
      start: interval.start,
      end: interval.end,
    });

    stream.pipe(response);
  }

  private createResponseHeader({
    module,
    lesson,
    range,
  }: CreateResponseHeaderProps) {
    const videoSize = this.readLessonService.getVideosInformation(
      module,
      lesson,
    ).size;

    const CHUNK_SIZE = 10 ** 10;
    const start = Number(range.replace(/\D/g, ''));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;

    const headers = {
      'Content-Range': `bytes ${start}-${end}/${videoSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': 'video/mp4',
    };

    const result = {
      headers: headers,
      interval: {
        start: start,
        end: end,
      },
    };

    return result;
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('video'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const result = this.uploadVideoService.execute(file);

    return result;
  }
}
