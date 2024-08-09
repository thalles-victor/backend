import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { LessonEntity } from './Lesson.entity';

@Entity({ name: 'modules' })
export class ModuleEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', unique: true })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  description: string | null;

  @OneToMany(() => LessonEntity, (lesson) => lesson.module)
  lessons: LessonEntity[];

  @Column({ default: new Date() })
  create_at: Date;

  @Column({ default: new Date() })
  updated_at: Date;
}
