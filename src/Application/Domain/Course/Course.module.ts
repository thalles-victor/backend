import { Module } from '@nestjs/common';
import { ReadLessonService } from './UseCases/ReadVideo/ReadVideo.service';
import { CourseController } from './Course.controller';
import { UploadVideoService } from './UseCases/UploadVideo/UploadService.service';
import { CreateLessonService } from './UseCases/CreateLesson/CreateLesson.service';
import { GetLessonService } from './UseCases/GetLessons/GetLessons.service';

@Module({
  controllers: [CourseController],
  providers: [
    ReadLessonService,
    UploadVideoService,
    CreateLessonService,
    GetLessonService,
  ],
})
export class CourseModule {}
