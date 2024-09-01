import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  StudentEntity,
  UpdateStudentEntity,
} from 'src/Application/Entities/Student.entity';
import { StudentsTypeOrmRepository } from 'src/Application/Repositories/Students/StudentsTypeOrm.repository';
import { RegisterStudentDto } from './dtos/Student.dtos';
import * as GenIds from 'src/utils/id-generate';
import { Role } from '../Auth/AccessControl/role';

@Injectable()
export class StudentService {
  constructor(private readonly studentsRepository: StudentsTypeOrmRepository) {}

  async register(student: RegisterStudentDto) {
    const studentExist = await this.studentsRepository.getOnByEmail(
      student.email,
    );

    if (studentExist) throw new BadRequestException('student already exist');

    const studentRegistered = await this.studentsRepository.create({
      id: GenIds.generateStudentId(),
      name: student.name,
      email: student.email,
      password: student.password,
      roles: [],
      RecoverAccount: null,
    });

    return studentRegistered;
  }

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

    const userUpdated = await this.studentsRepository.updateBy(
      { id },
      {
        name: updateEntity.name,
        password: updateEntity.password,
        refresh_token: updateEntity.refresh_token,
        roles: [Role.STUDENT],
        RecoverAccount: null,
      },
    );

    return userUpdated;
  }

  async becomeOrDetractAdmin(email: string, action: 'become' | 'detract') {
    let studentUpdate: StudentEntity;

    const studentToUpdate = await this.studentsRepository.getOnByEmail(email);

    if (!studentToUpdate) throw new NotFoundException();

    if (action === 'become') {
      studentUpdate = Object.assign(new StudentEntity(), {
        ...studentToUpdate,
        roles: [Role.STUDENT, Role.ADMIN],
      } as StudentEntity);
    } else if (action === 'detract') {
      studentUpdate = Object.assign(new StudentEntity(), {
        ...studentToUpdate,
        roles: [Role.STUDENT],
      } as StudentEntity);
    }

    const studentUpdated = await this.studentsRepository.updateBy(
      { email: studentToUpdate.email },
      studentUpdate,
    );

    return studentUpdated;
  }
}
