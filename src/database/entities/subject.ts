import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';

import { BaseEntity } from './base-entity';

import { Address } from './address';
import { User } from './user';
import { maxSize } from '@src/constants';
import { Genders } from '@src/types/entities';

@Entity('subject')
@Index('IDX_subject_email_user_id', ['email', 'userId'], { unique: true })
export class Subject extends BaseEntity {
  @PrimaryColumn({ type: 'uuid', name: 'subject_id' })
  public readonly id!: string;

  @Column({ type: 'uuid', name: 'user_id' })
  public readonly userId!: string;

  @Column({ type: 'varchar', length: maxSize.SUBJECT_NAME })
  public readonly name!: string;

  @Column({ type: 'varchar', length: maxSize.SUBJECT_SURNAME })
  public readonly surname!: string;

  @Index('IDX_subject_email', { unique: false })
  @Column({ type: 'varchar', length: maxSize.SUBJECT_EMAIL })
  public readonly email!: string;

  @Column({ type: 'date' })
  public readonly birthDate!: Date;

  @Column({ type: 'varchar', length: maxSize.SUBJECT_GENDER })
  public readonly gender!: Genders;

  @Column({ type: 'real' })
  public readonly weight!: number;

  @Column({ type: 'real' })
  public readonly height!: number;

  @Column({ type: 'real' })
  public readonly circumference!: number;

  @Index('IDX_subject_is_active', { unique: false })
  @Column({ type: 'boolean', name: 'is_active', default: true, select: false })
  public readonly isActive!: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: 'now()', select: false })
  public readonly createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', default: 'now()', select: false })
  public readonly updatedAt!: Date;

  @ManyToOne(() => User, user => user.subjects, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  public readonly user!: User;

  @OneToMany(() => Address, address => address.subject, { cascade: true })
  public readonly address!: Address[];
}
