import { Injectable, UnauthorizedException } from '@nestjs/common';
import { StudentService } from '../Student/Student.service';

@Injectable()
export class AuthService {
  constructor(private readonly studentService: StudentService) {}

  async signIn(email: string, pass: string): Promise<any> {
    const student = await this.studentService.findOne(email);

    if (student?.password != pass) {
      throw new UnauthorizedException();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = student;

    return result;
  }
}
