import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../../users/users.service';

export class ProcurementGuard extends AuthGuard('myjwtstrategy') {
  constructor(private readonly userService: UsersService) {
    super();
  }

  ROUTE_PATH = [{

  }];

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (request?.user) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
      const { role } = request.user;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { route } = request;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { path, methods } = route;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (path === '/purchase-orders' && methods.post) {
        return role === 'procurement' || role === 'manager';
      } else {
        return role === 'procurement';
      }
    }

    return false;
  }
}
