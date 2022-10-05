export type UserRoles =
  | 'STUDENT'
  | 'INSTRUCTOR'
  | 'RESEARCHER'
  | 'PROFESSIONAL'
  | 'PUBLIC_MANAGER'
  | 'OTHER';

export type UserStatus = 'TEMPORARY' | 'PENDING' | 'PERMANENT' | 'REJECTED' | 'DELETED';

export enum userStatus {
  TEMPORARY = 'TEMPORARY',
  PENDING = 'PENDING',
  PERMANENT = 'PERMANENT',
  REJECTED = 'REJECTED',
  DELETED = 'DELETED'
}

export enum userRoles {
  STUDENT = 'STUDENT',
  INSTRUCTOR = 'INSTRUCTOR',
  RESEARCHER = 'RESEARCHER',
  PROFESSIONAL = 'PROFESSIONAL',
  PUBLIC_MANAGER = 'PUBLIC_MANAGER',
  OTHER = 'OTHER'
}