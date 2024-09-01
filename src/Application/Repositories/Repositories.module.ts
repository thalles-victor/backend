import { Global, Module } from '@nestjs/common';
import { StudentsTypeOrmRepository } from './Students/StudentsTypeOrm.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from '../Entities/Student.entity';
import { VideoTypeOrmRepository } from './Files/Videos/VideoTypeOrm.repository';
import { VideoEntity } from '../Entities/Video.entity';
import { LessonEntity } from '../Entities/Lesson.entity';
import { LessonTypeOrmRepository } from './Lesson/LessonTypeOrm.repository';
import { ModuleEntity } from '../Entities/Module.entity';
import { ModuleTypeOrmRepository } from './Module/ModuleTypeOrm.repository';
import { RecoverAccountEntity } from '../Entities/RecoverAccount.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      StudentEntity,
      VideoEntity,
      LessonEntity,
      ModuleEntity,
      RecoverAccountEntity,
    ]),
  ],
  providers: [
    StudentsTypeOrmRepository,
    VideoTypeOrmRepository,
    LessonTypeOrmRepository,
    ModuleTypeOrmRepository,
  ],
  exports: [
    StudentsTypeOrmRepository,
    VideoTypeOrmRepository,
    LessonTypeOrmRepository,
    ModuleTypeOrmRepository,
  ],
})
export class RepositoriesModule {}
