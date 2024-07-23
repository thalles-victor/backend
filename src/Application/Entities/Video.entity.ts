import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { LessonEntity } from './Lesson.entity';

@Entity({ name: 'video' })
export class VideoEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar' })
  path: string;

  @Column({ type: 'varchar' })
  format: string;

  @Column({ type: 'varchar', unique: true })
  video_id: string;

  @Column({ type: 'varchar' })
  original_file_name: string;

  @OneToMany(() => LessonEntity, (lesson) => lesson.video)
  lesson?: LessonEntity[];

  @Column({ default: new Date() })
  upload_at: Date;

  @Column({ default: new Date() })
  updated_at: Date;
}
