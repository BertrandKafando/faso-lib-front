export type UserRole = 'READER' | 'AUTHOR' | 'ADMIN' | 'MODERATOR';
export type UserStatus = 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'DELETED';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  profilePicture: string | null;
  bio: string | null;
  institution: string | null;
  department: string | null;
  academicTitle: string | null;
  orcid: string | null;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  lastLoginAt: string | null;
  createdAt: string | null;
}
