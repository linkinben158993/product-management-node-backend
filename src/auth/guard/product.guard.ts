import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

export class ProductGuard extends AuthGuard('myjwtstrategy') {
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
      const { path } = route;

      if (String(path).includes('products')) {
        return role === 'inventory';
      }
    }

    return false;
  }
}
