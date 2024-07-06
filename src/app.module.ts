import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './Application/Domain/User/user.module';
import { CourseModule } from './Application/Domain/Course/Course.module';
import { StudentModule } from './Application/Domain/Student/Student.module';
import { AuthModule } from './Application/Domain/Auth/Auth.module';

@Module({
  imports: [UserModule, CourseModule, StudentModule, AuthModule],
  controllers: [AppController],
})
export class AppModule {}
