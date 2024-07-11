import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../Auth/guards/auth.guard';
import { TStudentPayload } from 'src/Application/@types';

@Controller('student')
export class StudentController {
  @Get('protected')
  @UseGuards(JwtAuthGuard)
  protected(@Request() req: any) {
    const payload: TStudentPayload = req.user;

    const response = {
      message: 'you can access protected route',
      jwt_payload: payload,
    };

    return response;
  }
}
