import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  StudentEntity,
  UpdateStudentEntity,
} from '../../Entities/Student.entity';
import { StudentsRepositoryContract } from './Students.repository-contract';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StudentsTypeOrmRepository
  implements
    StudentsRepositoryContract<
      StudentEntity,
      Omit<StudentEntity, 'id' | 'email'>
    >
{
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentTypeOrmRepository: Repository<StudentEntity>,
  ) {}

  async create(entity: StudentEntity): Promise<StudentEntity> {
    let studentEntity: StudentEntity;

    try {
      studentEntity = await this.studentTypeOrmRepository.save(entity);
    } catch (error) {
      console.log('error while save student');
      console.error(error);
    }

    return studentEntity;
  }

  getOnByEmail(email: string): Promise<StudentEntity | null> {
    return this.studentTypeOrmRepository.findOneBy({ email });
  }

  getOneById(id: string): Promise<StudentEntity | null> {
    return this.studentTypeOrmRepository.findOneBy({ id });
  }

  async updateById(
    id: string,
    updateEntity: UpdateStudentEntity,
  ): Promise<StudentEntity | null> {
    let studentUpdated: StudentEntity;

    try {
      const studentToUpdate = await this.studentTypeOrmRepository.findOneBy({
        id,
      });

      if (!studentToUpdate) throw new Error('student not found');

      studentUpdated = await this.studentTypeOrmRepository.save({
        ...studentToUpdate,
        ...updateEntity,
      });
    } catch (error) {
      console.log('error while updating the student');
      console.error(error);
    }

    return studentUpdated;
  }

  async deleteById(id: string): Promise<'success' | 'fail'> {
    let result: 'success' | 'fail';

    try {
      await this.studentTypeOrmRepository.delete(id);
      result = 'success';
    } catch (error) {
      console.log(error);
      result = 'fail';
    }

    return result;
  }
}
