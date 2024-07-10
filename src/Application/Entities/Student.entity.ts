import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'students' })
export class StudentEntity {
  @PrimaryGeneratedColumn('uuid')
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
