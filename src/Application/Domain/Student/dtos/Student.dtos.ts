import { ApiProperty } from '@nestjs/swagger';

export class RegisterStudentDto {
  @ApiProperty({
    example: 'jhon',
  })
  name: string;

  @ApiProperty({
    example: 'jhon@gmail.com',
  })
  email: string;

  @ApiProperty({
    example: '#mypassword123',
  })
  password: string;
}
