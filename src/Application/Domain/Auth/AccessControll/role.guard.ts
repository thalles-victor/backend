import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const jwtPayload = request.user;

    const result = this.matchRoles(roles, jwtPayload.roles);

    console.log(result);

    return result;
  }

  private matchRoles(requiredRoles: Array<Role>, userRoles: Array<Role>) {
    return requiredRoles.some((role) => userRoles.includes(role));
  }
}
