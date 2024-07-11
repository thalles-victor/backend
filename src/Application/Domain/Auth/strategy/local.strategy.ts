import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../Auth.service';
import { StudentEntity } from 'src/Application/Entities/Student.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<StudentEntity> {
    const student = await this.authService.validateUser(email, password);

    if (!student) throw new UnauthorizedException();

    return student;
  }
}
