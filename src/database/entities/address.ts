import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base-entity';
import { User } from './user';
import { Subject } from './subject';
import { Nil } from '@src/types/global';
import { maxSize } from '@src/constants';

@Entity('address')
export class Address extends BaseEntity {
  @PrimaryColumn({ type: 'uuid', name: 'address_id' })
  public readonly id!: string;

  @Column({ type: 'uuid', name: 'user_id', nullable: true, update: false, select: false })
  public readonly userId: string | Nil;

  @Column({ type: 'uuid', name: 'subject_id', nullable: true, update: false, select: false })
  public readonly subjectId: string | Nil;

  @Column({ type: 'varchar', length: maxSize.ADDRESS_STATE })
  public readonly state!: string;

  @Column({ type: 'varchar', length: maxSize.ADDRESS_CITY })
  public readonly city!: string;

  @Column({ type: 'varchar', length: maxSize.ADDRESS_DISTRICT })
  public readonly district!: string;

  @Column({ type: 'varchar', length: maxSize.ADDRESS_STREET })
  public readonly street!: string;

  @Column({
    type: 'varchar',
    name: 'zip_code',
    length: maxSize.ADDRESS_ZIP_CODE
  })
  public readonly zipCode!: string;

  @Column({ type: 'varchar', length: maxSize.ADDRESS_COMPLEMENT, nullable: true })
  public readonly complement: string | Nil;

  @Column({ type: 'int', nullable: true })
  public readonly number: number | Nil;

  @Column({ type: 'varchar', nullable: true })
  public readonly lat: string | Nil;

  @Column({ type: 'varchar', nullable: true })
  public readonly long: string | Nil;

  @ManyToOne(() => User, user => user.addresses, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  public readonly user!: User;

  @ManyToOne(() => Subject, subject => subject.address, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'subject_id', referencedColumnName: 'id' })
  public readonly subject!: Subject;
}
