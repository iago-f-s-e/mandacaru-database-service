import { maxSize } from '@src/constants';
import { AssessmentDay } from '@src/types/entities';
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
import { AssessmentMeal } from './assessment-meal';
import { BaseEntity } from './base-entity';
import { Subject } from './subject';
import { User } from './user';

@Entity('assessment')
export class Assessment extends BaseEntity {
  @PrimaryColumn({ type: 'uuid', name: 'assessment_id' })
  public readonly id!: string;

  @Column({ type: 'uuid', name: 'subject_id' })
  public readonly subjectId!: string;

  @Column({ type: 'uuid', name: 'user_id' })
  public readonly userId!: string;

  @Index('IDX_assessment_day', { unique: false })
  @Column({ type: 'varchar', name: 'assessment_day', length: maxSize.ASSESSMENT_DAY })
  public readonly day!: AssessmentDay;

  @Index('IDX_assessment_date', { unique: false })
  @Column({ type: 'date', name: 'assessment_date' })
  public readonly date!: Date;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: 'now()', select: false })
  public readonly createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', default: 'now()', select: false })
  public readonly updatedAt!: Date;

  @ManyToOne(() => User, user => user.assessments, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  public readonly user!: User;

  @ManyToOne(() => Subject, subject => subject.assessments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'subject_id', referencedColumnName: 'id' })
  public readonly subject!: Subject;

  @OneToMany(() => AssessmentMeal, meals => meals.assessment)
  public readonly meals!: AssessmentMeal[];
}
