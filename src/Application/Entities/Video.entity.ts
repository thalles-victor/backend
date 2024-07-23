import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
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

  @OneToOne(() => LessonEntity, (lesson) => lesson.id)
  lesson: LessonEntity;

  @Column({ default: new Date() })
  upload_at: Date;

  @Column({ default: new Date() })
  updated_at: Date;
}
