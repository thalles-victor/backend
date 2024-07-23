import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { LessonEntity } from './Lesson.entity';

@Entity({ name: 'modules' })
export class ModuleEntity {
  @PrimaryColumn()
  id: string;

  @OneToMany(() => LessonEntity, (lesson) => lesson.id)
  lessons: LessonEntity[];

  @Column({ default: new Date() })
  create_at: Date;

  @Column({ default: new Date() })
  updated_at: Date;
}
