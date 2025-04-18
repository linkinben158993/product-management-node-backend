import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../../users/users.service';

export class PurchaseOrderGuard extends AuthGuard('myjwtstrategy') {
  constructor(private readonly userService: UsersService) {
    super();
  }

  // Todo: There must be a more generic way we can do this
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
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      else if (path === '/purchase-orders/:id' && methods.patch) {
        return role === 'manager' || role === 'finance';
      } else {
        return role === 'procurement';
      }
    }

    return false;
  }
}
