import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'students' })
export class StudentEntity {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', nullable: true, select: false })
  refresh_token?: string;
}

export type UpdateStudentEntity = Omit<StudentEntity, 'id' | 'email'>;
