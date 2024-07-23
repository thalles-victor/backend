import { LessonEntity } from 'src/Application/Entities/Lesson.entity';

export type LessonSearchParam = { id: string };

export interface LessonRepositoryContract {
  create(lessonEntity: LessonEntity): Promise<LessonEntity>;
  getBy(param: LessonSearchParam): Promise<LessonEntity | null>;
  deleteBy(param: LessonSearchParam): Promise<'success' | 'fail'>;
}
