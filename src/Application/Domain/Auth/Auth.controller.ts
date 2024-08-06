import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './Auth.service';
import { RegisterStudentDto } from '../Student/dtos/Student.dtos';
import { AuthJwtGuard } from './guards/auth.guard';
import { RolesGuard } from './AccessControl/role.guard';
import { RolesDecorator } from './AccessControl/roles.decorator';
import { Role } from './AccessControl/role';
import { StudentService } from '../Student/Student.service';
import { SignInDto } from './Dtos/auth.dtos';
import { StudentEntity } from 'src/Application/Entities/Student.entity';
import { ApiResponse } from '@nestjs/swagger';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly studentService: StudentService,
  ) {}

  @Post('signin')
  async login(@Body() credentials: SignInDto) {
    return this.authService.signIn(credentials);
  }

  @Post('signup')
  @ApiResponse({
    status: 201,
    description: 'created',
  })
  @ApiResponse({ status: 400, description: 'student already exist' })
  async register(
    @Body() student: RegisterStudentDto,
  ): Promise<Omit<StudentEntity, 'password'>> {
    return this.authService.signUp(student);
  }

  @Post('change-position')
  @UseGuards(AuthJwtGuard, RolesGuard)
  @RolesDecorator(Role.ROOT)
  becomeStudentAsAdmin(@Body('email') email: string) {
    return this.studentService.becomeOrDetractAdmin(email, 'detract');
  }
}
