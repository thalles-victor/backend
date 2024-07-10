import { Module } from '@nestjs/common';
import { StudentModule } from '../Student/Student.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './Auth.service';
import { AuthController } from './Auth.controller';

@Module({
  imports: [
    StudentModule,
    JwtModule.register({
      global: false,
      secret: 'SECRET',
      signOptions: { expiresIn: '10min' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
