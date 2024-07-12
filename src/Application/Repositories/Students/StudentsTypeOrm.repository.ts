import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  StudentEntity,
  UpdateStudentEntity,
} from '../../Entities/Student.entity';
import {
  StudentsRepositoryContract,
  TTargetStudentParam,
} from './Students.repository-contract';
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

  async updateBy(
    target: TTargetStudentParam,
    updateEntity: UpdateStudentEntity,
  ): Promise<StudentEntity | null> {
    let studentToUpdate: StudentEntity | undefined = undefined;

    try {
      if ('id' in target) {
        studentToUpdate = await this.studentTypeOrmRepository.findOneBy({
          id: target.id,
        });
      } else if ('email' in target) {
        studentToUpdate = await this.studentTypeOrmRepository.findOneBy({
          email: target.email,
        });
      }
    } catch (error) {
      console.log('error while updating the student');
      console.error(error);
    }

    if (!studentToUpdate) throw new Error('student not found');

    const studentUpdated = await this.studentTypeOrmRepository.save({
      ...studentToUpdate,
      ...updateEntity,
    });

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
