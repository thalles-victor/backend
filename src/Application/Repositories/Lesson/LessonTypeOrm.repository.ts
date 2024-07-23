import { LessonEntity } from 'src/Application/Entities/Lesson.entity';
import {
  LessonRepositoryContract,
  LessonSearchParam,
} from './Lesson.repository-contract';
import { Repository } from 'typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LessonTypeOrmRepository implements LessonRepositoryContract {
  constructor(
    @InjectRepository(LessonEntity)
    private readonly lessonRepository: Repository<LessonEntity>,
  ) {}

  async create(lessonEntity: LessonEntity): Promise<LessonEntity> {
    try {
      const lessonCreated = await this.lessonRepository.save(lessonEntity);

      return lessonCreated;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async getBy(param: LessonSearchParam): Promise<LessonEntity | null> {
    const [key, value] = Object.entries(param)[0];

    const lesson = await this.lessonRepository.findOneBy({ [key]: value });

    return lesson ?? null;
  }

  async deleteBy(param: LessonSearchParam): Promise<'success' | 'fail'> {
    const [key, value] = Object.entries(param)[0];

    try {
      await this.lessonRepository.delete({ [key]: value });

      return 'success';
    } catch (error) {
      console.log(error);
      return 'fail';
    }
  }

  async getAll(): Promise<LessonEntity[]> {
    return this.lessonRepository.find({
      relations: {
        video: true,
      },
    });
  }
}
