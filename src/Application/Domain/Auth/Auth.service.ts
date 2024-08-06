import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { StudentService } from '../Student/Student.service';
import { JwtService } from '@nestjs/jwt';
import { StudentEntity } from 'src/Application/Entities/Student.entity';
import { TRootPayload, TStudentPayload } from 'src/Application/@types';
import { RegisterStudentDto } from '../Student/dtos/Student.dtos';
import { ConfigService } from '@nestjs/config';
import { SignInDto } from './Dtos/auth.dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly studentsService: StudentService,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<StudentEntity | 'isRoot'> {
    const rootAuthResult = await this.userIsRoot(email, password);
    if (rootAuthResult) {
      return 'isRoot';
    }

    const student = await this.studentsService.getByEmail(email);

    if (!student) {
      throw new NotFoundException('student not found');
    }

    if (student.password != password) {
      throw new UnauthorizedException('password incorrect');
    }

    return student;
  }

  async signIn(credentials: SignInDto) {
    const student = await this.validateUser(
      credentials.email,
      credentials.password,
    );

    if (student !== 'isRoot') {
      const payload: TStudentPayload = {
        sub: student.id,
        roles: student.roles,
      };

      const access_token = this.jwtService.sign(payload);

      return { access_token };
    }

    const payload: TRootPayload = {
      roles: ['ROOT'],
    };

    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }

  /*** @deprecated */
  private async validateStudent(
    credentials: SignInDto,
  ): Promise<StudentEntity> {
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

  private async userIsRoot(email: string, password: string) {
    const rootEmail = this.configService.get<string>('ROOT_EMAIL');
    const rootPassword = this.configService.get<string>('ROOT_PASSWORD');

    if (rootEmail === email && rootPassword === password) {
      return true;
    }

    return false;
  }
}
