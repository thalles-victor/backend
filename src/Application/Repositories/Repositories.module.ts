import { Global, Module } from '@nestjs/common';
import { StudentsTypeOrmRepository } from './Students/StudentsTypeOrm.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from '../Entities/Student.entity';
import { VideoTypeOrmRepository } from './Files/Videos/VideoTypeOrm.repository';
import { VideoEntity } from '../Entities/Video.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity, VideoEntity])],
  providers: [StudentsTypeOrmRepository, VideoTypeOrmRepository],
  exports: [StudentsTypeOrmRepository, VideoTypeOrmRepository],
})
export class RepositoriesModule {}
