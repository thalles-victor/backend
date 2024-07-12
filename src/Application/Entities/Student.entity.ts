import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Role } from '../Domain/Auth/AccessControl/role';

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

  @Column({ type: 'varchar', default: [Role.STUDENT], array: true })
  roles: Array<Role>;
}

export type UpdateStudentEntity = Omit<StudentEntity, 'id' | 'email'>;
