import { Module } from '@nestjs/common';
import { StudentController } from './Student.controller';
import { StudentService } from './Student.service';
import { RepositoriesModule } from 'src/Application/Repositories/Students.module';

@Module({
  imports: [RepositoriesModule],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
