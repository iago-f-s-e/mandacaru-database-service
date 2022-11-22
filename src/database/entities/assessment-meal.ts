import { maxSize } from '@src/constants';
import { AssessmentMealType } from '@src/types/entities';
import { Nil } from '@src/types/global';
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { AlimentMeasure } from './aliment-measure';
import { Assessment } from './assessment';
import { BaseEntity } from './base-entity';

@Entity('assessment_meal')
export class AssessmentMeal extends BaseEntity {
  @PrimaryColumn({ type: 'uuid', name: 'assessment_meal_id' })
  public readonly id!: string;

  @Column({ type: 'uuid', name: 'assessment_id' })
  public readonly assessmentId!: string;

  @Column({ type: 'uuid', name: 'aliment_measure_id' })
  public readonly alimentMeasureId!: string;

  @Index('IDX_assessment_meal_type', { unique: false })
  @Column({ type: 'varchar', name: 'assessment_meal_type', length: maxSize.ASSESSMENT_MEAL_TYPE })
  public readonly type!: AssessmentMealType;

  @Index('IDX_assessment_meal_time', { unique: false })
  @Column({ type: 'time', name: 'assessment_meal_time' })
  public readonly time!: string;

  @Column({ type: 'float', name: 'quantity' })
  public readonly quantity!: number;

  @Column({ type: 'varchar', name: 'place', nullable: true })
  public readonly place: string | Nil;

  @Column({ type: 'varchar', name: 'brand', nullable: true })
  public readonly brand: string | Nil;

  @ManyToOne(() => Assessment, assessment => assessment.meals, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'assessment_id', referencedColumnName: 'id' })
  public readonly assessment!: Assessment;

  @ManyToOne(() => AlimentMeasure, alimentMeasure => alimentMeasure.assessmentMeals, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'aliment_measure_id', referencedColumnName: 'id' })
  public readonly alimentMeasure!: AlimentMeasure;
}
