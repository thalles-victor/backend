import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { StudentService } from '../Student/Student.service';
import { JwtService } from '@nestjs/jwt';
import { StudentEntity } from 'src/Application/Entities/Student.entity';
import { TSignIn, TStudentPayload } from 'src/Application/@types';
import { RegisterStudentDto } from '../Student/dtos/Student.dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly studentsService: StudentService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<StudentEntity> {
    const student = await this.studentsService.getByEmail(email);

    if (!student) {
      throw new NotFoundException('student not found');
    }

    if (student.password != password) {
      throw new UnauthorizedException('password incorrect');
    }

    return student;
  }

  async signIn(credentials: TSignIn) {
    const student = await this.validateStudent(credentials);

    const payload: TStudentPayload = { sub: student.id, roles: student.roles };

    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }

  private async validateStudent(credentials: TSignIn): Promise<StudentEntity> {
    const studentExist = await this.studentsService.getByEmail(
      credentials.email,
    );

    if (!studentExist) throw new UnauthorizedException('student not found');

    const passwordIsMatch = studentExist.password === credentials.password;

    if (!passwordIsMatch)
      throw new UnauthorizedException('the password is wrong');

    return studentExist;
  }

  async signUp(
    student: RegisterStudentDto,
  ): Promise<Omit<StudentEntity, 'password'>> {
    const studentCreated = await this.studentsService.register(student);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = studentCreated;

    return result;
  }
}
