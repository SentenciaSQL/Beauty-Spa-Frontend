export type Role = 'ADMIN' | 'RECEPTIONIST' | 'EMPLOYEE' | 'CUSTOMER';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: Role;
  full_name?: string | null;
}
