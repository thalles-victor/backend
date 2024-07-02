import { Module } from '@nestjs/common';
import { ReadLessonService } from './UseCases/ReadVideo/ReadVideo.service';
import { CourseController } from './Course.controller';

@Module({
  controllers: [CourseController],
  providers: [ReadLessonService],
})
export class CourseModule {}
