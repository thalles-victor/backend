import { Global, Module } from '@nestjs/common';
import { StudentsTypeOrmRepository } from './Students/StudentsTypeOrm.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from '../Entities/Student.entity';
import { VideoTypeOrmRepository } from './Files/Videos/VideoTypeOrm.repository';
import { VideoEntity } from '../Entities/Video.entity';
import { LessonEntity } from '../Entities/Lesson.entity';
import { LessonTypeOrmRepository } from './Lesson/LessonTypeOrm.repository';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([StudentEntity, VideoEntity, LessonEntity]),
  ],
  providers: [
    StudentsTypeOrmRepository,
    VideoTypeOrmRepository,
    LessonTypeOrmRepository,
  ],
  exports: [
    StudentsTypeOrmRepository,
    VideoTypeOrmRepository,
    LessonTypeOrmRepository,
  ],
})
export class RepositoriesModule {}
