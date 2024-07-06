import { Module } from '@nestjs/common';
import { StudentController } from './Student.controller';
import { StudentService } from './Student.service';

@Module({
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
