import { SetMetadata } from '@nestjs/common';
import { Role } from './role';

export const ROLES_METADATA = 'roles';

export const RolesDecorator = (...roles: Role[]) =>
  SetMetadata(ROLES_METADATA, roles);
