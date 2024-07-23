import { Injectable } from '@nestjs/common';
import { LessonTypeOrmRepository } from 'src/Application/Repositories/Lesson/LessonTypeOrm.repository';

@Injectable()
export class GetLessonService {
  constructor(private readonly lessonRepository: LessonTypeOrmRepository) {}

  async execute() {
    const lessons = await this.lessonRepository.getAll();

    return lessons;
  }
}
