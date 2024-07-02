import { Controller, Get, Req, Res } from '@nestjs/common';
import { ReadLessonService } from './UseCases/ReadVideo/ReadVideo.service';
import { Request, Response } from 'express';

@Controller('aulas')
export class CourseController {
  constructor(private readonly readLessonService: ReadLessonService) {}

  @Get()
  async exampleLesson(@Req() request: Request, @Res() response: Response) {
    const range = request.headers.range;

    if (!range) {
      return response.status(400).send('Requires Range header');
    }

    const videoSize = this.readLessonService.getVideosInformation().size;

    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ''));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;

    const headers = {
      'Content-Range': `bytes ${start}-${end}/${videoSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': 'video/mp4',
    };

    response.writeHead(206, headers);

    const stream = await this.readLessonService.execute({ start, end });

    stream.pipe(response);
  }
}
