import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { StudentService } from '../Student/Student.service';
import { JwtService } from '@nestjs/jwt';
import { StudentEntity } from 'src/Application/Entities/Student.entity';
import { TStudentPayload } from 'src/Application/@types';

@Injectable()
export class AuthService {
  constructor(
    private readonly studentsService: StudentService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<StudentEntity, 'password'>> {
    const student = await this.studentsService.getByEmail(email);

    if (!student) {
      throw new NotFoundException('student not found');
    }

    if (student.password != password) {
      throw new UnauthorizedException('password incorrect');
    }

    return student;
  }

  async signIn(student: StudentEntity) {
    const payload: TStudentPayload = { sub: student.id };

    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }
}
