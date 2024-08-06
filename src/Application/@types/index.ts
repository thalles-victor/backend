import { Role } from '../Domain/Auth/AccessControl/role';

export type TPayload = {
  sub: string;
  email: string;
};

export type TStudentPayload = {
  sub: string;
  roles: Array<Role>;
  iat?: number;
  exp?: number;
};

export type TRootPayload = {
  roles: ['ROOT'];
};
