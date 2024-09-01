import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { StudentEntity } from './Student.entity';

@Entity('recover-account')
export class RecoverAccountEntity {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column({ type: 'varchar', nullable: true, default: null })
  token: string | null;

  @Column({ type: 'varchar', nullable: true, default: null })
  attempts: string | null;

  @Column({ type: 'bigint', nullable: true, default: null })
  expires_in: number;

  @OneToOne(() => StudentEntity, (student) => student.RecoverAccount)
  Student: StudentEntity;
}

export interface RecoverAccountUpdateEntity {
  token: string;
  attempts: string;
  expires_in: number;
}
