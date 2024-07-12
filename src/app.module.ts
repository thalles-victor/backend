import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CourseModule } from './Application/Domain/Course/Course.module';
import { StudentModule } from './Application/Domain/Student/Student.module';
import { AuthModule } from './Application/Domain/Auth/Auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './Application/Entities/Student.entity';
import { RepositoriesModule } from './Application/Repositories/Students.module';

import * as Joi from 'joi';

const schema = Joi.object().keys({
  ACCESS_TOKEN_SECRET: Joi.string().required(),
  ACCESS_TOKEN_EXPIRATION: Joi.string().required(),
  REFRESH_TOKEN_SECRET: Joi.string().required(),
  REFRESH_TOKEN_EXPIRATION: Joi.string().required(),
  ROOT_EMAIL: Joi.string().required(),
  ROOT_PASSWORD: Joi.string().required(),
});

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: schema,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      database: 'db',
      password: 'pass',
      username: 'user',
      entities: [StudentEntity],
      synchronize: true,
    }),

    CourseModule,
    StudentModule,
    RepositoriesModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
