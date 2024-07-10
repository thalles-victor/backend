import { Module } from '@nestjs/common';
import { StudentsTypeOrmRepository } from './Students/StudentsTypeOrm.repository';

@Module({
  providers: [StudentsTypeOrmRepository],
  exports: [StudentsTypeOrmRepository],
})
export class RepositoriesModule {}
