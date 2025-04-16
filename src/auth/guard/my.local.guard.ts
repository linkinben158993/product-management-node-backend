import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class MyLocalGuard extends AuthGuard('mylocalstrategy') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }
}
