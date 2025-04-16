import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class MyJwtGuard extends AuthGuard('myjwtstrategy') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }
}
