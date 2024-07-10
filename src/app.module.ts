import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './Application/Domain/User/user.module';
import { CourseModule } from './Application/Domain/Course/Course.module';
import { StudentModule } from './Application/Domain/Student/Student.module';
import { AuthModule } from './Application/Domain/Auth/Auth.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './Application/Entities/Student.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      database: 'db',
      password: 'pass',
      username: 'user',
      entities: [StudentEntity],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        ACCESS_TOKEN_SECRET: Joi.string(),
        ACCESS_TOKEN_EXPIRATION: Joi.string(),
        REFRESH_TOKEN_SECRET: Joi.string(),
        REFRESH_TOKEN_EXPIRATION: Joi.string(),
      }),
    }),
    UserModule,
    CourseModule,
    StudentModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
