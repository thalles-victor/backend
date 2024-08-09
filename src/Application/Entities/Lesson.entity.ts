import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { VideoEntity } from './Video.entity';
import { ModuleEntity } from './Module.entity';

@Entity({ name: 'lessons' })
export class LessonEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @ManyToOne(() => VideoEntity, (video) => video.lesson)
  video: VideoEntity;

  @ManyToOne(() => ModuleEntity, (module) => module.lessons)
  module: ModuleEntity;

  @Column({ default: new Date() })
  create_at: Date;

  @Column({ default: new Date() })
  updated_at: Date;
}
