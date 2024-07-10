import { Injectable, NotFoundException } from '@nestjs/common';
import {
  StudentEntity,
  UpdateStudentEntity,
} from 'src/Application/Entities/Student.entity';
import { StudentsTypeOrmRepository } from 'src/Application/Repositories/Students/StudentsTypeOrm.repository';

@Injectable()
export class StudentService {
  constructor(private readonly studentsRepository: StudentsTypeOrmRepository) {}

  async getByEmail(email: string): Promise<StudentEntity | null> {
    const student = await this.studentsRepository.getOnByEmail(email);

    return student ?? null;
  }

  async getById(email: string): Promise<StudentEntity | null> {
    const student = await this.studentsRepository.getOneById(email);

    return student ?? null;
  }

  async deleteById(id: string): Promise<'success' | 'fail'> {
    const result = await this.studentsRepository.deleteById(id);

    return result;
  }

  async updateStudent(id, updateEntity: UpdateStudentEntity) {
    const userToUpdate = await this.studentsRepository.getOneById(id);

    if (!userToUpdate) throw new NotFoundException('student not found');

    const userUpdated = await this.studentsRepository.updateById(id, {
      name: updateEntity.name,
      password: updateEntity.password,
      refresh_token: updateEntity.refresh_token,
    });

    return userUpdated;
  }
}
