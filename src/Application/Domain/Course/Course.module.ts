import { Module } from '@nestjs/common';
import { ReadLessonService } from './UseCases/ReadVideo/ReadVideo.service';
import { CourseController } from './Course.controller';
import { UploadVideoService } from './UseCases/UploadVideo/UploadService.service';

@Module({
  controllers: [CourseController],
  providers: [ReadLessonService, UploadVideoService],
})
export class CourseModule {}
