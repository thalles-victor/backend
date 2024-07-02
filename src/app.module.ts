import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './Application/Domain/User/user.module';
import { CourseModule } from './Application/Domain/Course/Course.module';

@Module({
  imports: [UserModule, CourseModule],
  controllers: [AppController],
})
export class AppModule {}
