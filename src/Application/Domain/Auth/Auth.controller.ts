import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './Auth.service';
import { RegisterStudentDto } from '../Student/dtos/Student.dtos';
import { TSignIn } from 'src/Application/@types';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async login(@Body() credentials: TSignIn) {
    return this.authService.signIn(credentials);
  }

  @Post('signup')
  async register(@Body() student: RegisterStudentDto) {
    return this.authService.signUp(student);
  }
}
