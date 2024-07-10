import { Global, Module } from '@nestjs/common';
import { StudentsTypeOrmRepository } from './Students/StudentsTypeOrm.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from '../Entities/Student.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity])],
  providers: [StudentsTypeOrmRepository],
  exports: [StudentsTypeOrmRepository],
})
export class RepositoriesModule {}
