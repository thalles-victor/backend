import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './Auth.service';
import { RegisterStudentDto } from '../Student/dtos/Student.dtos';
import { TSignIn } from 'src/Application/@types';
import { AuthJwtGuard } from './guards/auth.guard';
import { RolesGuard } from './AccessControl/role.guard';
import { RolesDecorator } from './AccessControl/roles.decorator';
import { Role } from './AccessControl/role';
import { StudentService } from '../Student/Student.service';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly studentService: StudentService,
  ) {}

  @Post('signin')
  async login(@Body() credentials: TSignIn) {
    return this.authService.signIn(credentials);
  }

  @Post('signup')
  async register(@Body() student: RegisterStudentDto) {
    return this.authService.signUp(student);
  }

  @Post('change-position')
  @UseGuards(AuthJwtGuard, RolesGuard)
  @RolesDecorator(Role.ROOT)
  becomeStudentAsAdmin(@Body('email') email: string) {
    return this.studentService.becomeOrDetractAdmin(email, 'detract');
  }
}
