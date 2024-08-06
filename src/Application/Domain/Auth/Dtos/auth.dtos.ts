import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ title: 'email', example: 'jhon@gmail.com' })
  email: string;

  @ApiProperty({ title: 'password', example: '#@mypassword123' })
  password: string;
}
