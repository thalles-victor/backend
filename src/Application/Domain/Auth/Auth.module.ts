import { Module } from '@nestjs/common';
import { StudentModule } from '../Student/Student.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './Auth.service';
import { AuthController } from './Auth.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    StudentModule,
    JwtModule.register({
      global: true, // all modules can be access this JwtService.
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
