import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ReadLessonService } from './UseCases/ReadVideo/ReadVideo.service';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadVideoService } from './UseCases/UploadVideo/UploadService.service';
import { CreateLessonDto } from './UseCases/CreateLesson/CreateLesson.dto';
import { CreateLessonService } from './UseCases/CreateLesson/CreateLesson.service';
import { GetLessonService } from './UseCases/GetLessons/GetLessons.service';
import { GetAllModulesService } from './UseCases/GetAllModules/GetAllModules.service';
import { CreateModuleDto } from './UseCases/CreateModule/CreateModule.dto';
import { CreateModuleService } from './UseCases/CreateModule/CreteModule.service';
import { validatePagination } from 'src/utils';

type CreateResponseHeaderProps = {
  module: string;
  lesson: string;
  range: string;
};

@Controller('course')
export class CourseController {
  constructor(
    private readonly readLessonService: ReadLessonService,
    private readonly uploadVideoService: UploadVideoService,
    private readonly createLessonService: CreateLessonService,
    private readonly getLessonsService: GetLessonService,
    private readonly getAllModulesService: GetAllModulesService,
    private readonly createModuleService: CreateModuleService,
  ) {}

  @Get('hello')
  getCourseHello() {
    return 'hello course router';
  }

  @Get('read-lesson/:lesson')
  async exampleLesson(
    @Req() request: Request,
    @Res() response: Response,
    // @Param('module') module: string,
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
      module: 'Module-1-Iniciando-Com-nestjs',
      lesson,
      range,
    });

    response.writeHead(206, headers);

    const stream = await this.readLessonService.execute(
      'Module-1-Iniciando-Com-nestjs',
      lesson,
      {
        start: interval.start,
        end: interval.end,
      },
    );

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

  @Post('lesson')
  async createLesson(@Body() lessonDto: CreateLessonDto) {
    return this.createLessonService.execute(lessonDto);
  }

  @Get()
  getLessons() {
    return this.getLessonsService.execute();
  }

  @Get('modules')
  getAllModules(@Query('take') take: string, @Query('skip') skip: string) {
    const validPagination = validatePagination({ take, skip });

    return this.getAllModulesService.execute({
      take: validPagination.take,
      skip: validPagination.skip,
    });
  }

  @Post('module/create')
  async createModule(@Body() createModuleDto: CreateModuleDto) {
    return await this.createModuleService.execute(createModuleDto);
  }
}
