import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('modules')
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

@Entity('lessons')
export class LessonEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  video_url: string;

  @Column({ type: 'integer' })
  duration: number;

  @Column({ default: new Date() })
  create_at: Date;

  @Column({ default: new Date() })
  updated_at: Date;
}

@Entity({ name: 'video_lessons' })
export class VideoLessonsEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar' })
  path: string;

  @Column({ type: 'varchar' })
  format: string;

  @Column({ type: 'varchar', unique: true })
  file_id: string;

  @Column({ type: 'varchar' })
  original_file_name: string;

  @Column({ default: new Date() })
  upload_at: Date;

  @Column({ default: new Date() })
  updated_at: Date;
}
