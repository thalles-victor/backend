import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Req,
  Res,
} from '@nestjs/common';
import { ReadLessonService } from './UseCases/ReadVideo/ReadVideo.service';
import { Request, Response } from 'express';

type CreateResponseHeaderProps = {
  nameId: string;
  range: string;
};

@Controller('aulas')
export class CourseController {
  constructor(private readonly readLessonService: ReadLessonService) {}

  @Get(':nameId')
  async exampleLesson(
    @Req() request: Request,
    @Res() response: Response,
    @Param() params: any,
  ) {
    const range = request.headers.range;
    // const nameId = request.params['name-id'];
    const nameId = params.nameId;

    if (!nameId) {
      throw new BadRequestException('Require the video name id');
    }

    if (!range) {
      throw new BadRequestException('Requires Range header');
    }

    const { headers, interval } = this.createResponseHeader({ nameId, range });

    response.writeHead(206, headers);

    const stream = await this.readLessonService.execute(nameId, {
      start: interval.start,
      end: interval.end,
    });

    stream.pipe(response);
  }

  private createResponseHeader({ nameId, range }: CreateResponseHeaderProps) {
    const videoSize = this.readLessonService.getVideosInformation(nameId).size;

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
}
