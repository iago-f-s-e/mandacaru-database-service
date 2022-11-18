import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { Address } from './address';
import { Subject } from './subject';
import { maxSize } from '@src/constants';
import { UserRoles, UserStatus } from '@src/types/entities';

@Entity('user')
@Index('IDX_user_email_status', ['email', 'status'], { unique: true })
export class User extends BaseEntity {
  @PrimaryColumn({ type: 'uuid', name: 'user_id' })
  public readonly id!: string;

  @Column({ type: 'varchar', length: maxSize.USER_NAME })
  public readonly name!: string;

  @Column({ type: 'varchar', length: maxSize.USER_SURNAME })
  public readonly surname!: string;

  @Index('IDX_user_email', { unique: true })
  @Column({ type: 'varchar', length: maxSize.USER_EMAIL, unique: true })
  public readonly email!: string;

  @Index('IDX_user_document', { unique: true })
  @Column({
    type: 'varchar',
    length: maxSize.USER_CPF,
    unique: true,
    select: false,
    update: false
  })
  public readonly document!: string;

  @Index('IDX_user_status', { unique: false })
  @Column({ type: 'varchar', length: maxSize.USER_STATUS, default: 'TEMPORARY', select: false })
  public readonly status!: UserStatus;

  @Column({ type: 'varchar', length: maxSize.USER_ROLE })
  public readonly role!: UserRoles;

  @Column({ type: 'varchar', select: false })
  public readonly password!: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: 'now()', select: false })
  public readonly createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', default: 'now()', select: false })
  public readonly updatedAt!: Date;

  @OneToMany(() => Address, address => address.user, { cascade: true })
  public readonly addresses!: Address[];

  @OneToMany(() => Subject, subjects => subjects.user)
  public readonly subjects!: Subject[];
}
