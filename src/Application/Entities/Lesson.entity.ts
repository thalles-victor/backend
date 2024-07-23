import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { VideoEntity } from './Video.entity';

@Entity({ name: 'lessons' })
export class LessonEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @OneToOne(() => VideoEntity, (video) => video.id)
  video: VideoEntity;

  @Column({ type: 'integer' })
  duration: number;

  @Column({ default: new Date() })
  create_at: Date;

  @Column({ default: new Date() })
  updated_at: Date;
}
