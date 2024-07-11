import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './Auth.service';
import { RegisterStudentDto } from '../Student/dtos/Student.dtos';
import { AuthGuard } from '@nestjs/passport';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  async login(@Request() request: any) {
    return this.authService.signIn(request.user);
  }

  @Post('signup')
  async register(@Body() student: RegisterStudentDto) {
    return this.authService.signUp(student);
  }
}
