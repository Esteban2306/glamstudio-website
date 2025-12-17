import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class OptionalJwtGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {

    if (context.getType() !== 'http') {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    if (!request || !request.headers) {
      return true;
    }

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return true;
    }

    return super.canActivate(context);
  }
}
