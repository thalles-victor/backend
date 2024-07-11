import { Module } from '@nestjs/common';
import { StudentModule } from '../Student/Student.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './Auth.service';
import { AuthController } from './Auth.controller';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    StudentModule,
    JwtModule.register({
      global: false,
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
