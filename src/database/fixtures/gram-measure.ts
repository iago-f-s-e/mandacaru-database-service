import { CookingMeasure } from '../entities';

export const gramMeasureFixture: Omit<CookingMeasure, 'aliments'> = {
  id: 'c45753c5-6d5d-49e3-be00-e24a54f01c70',
  name: 'GRAMA',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
};
