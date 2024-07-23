import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { VideoEntity } from './Video.entity';

@Entity({ name: 'lessons' })
export class LessonEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @ManyToOne(() => VideoEntity, (video) => video.lesson)
  video: VideoEntity;

  @Column({ default: new Date() })
  create_at: Date;

  @Column({ default: new Date() })
  updated_at: Date;
}
