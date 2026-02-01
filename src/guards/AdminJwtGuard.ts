import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminJwtGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    const token = this.extractToken(request);

    try {
      const payload = this.jwt.verify(token, {
        secret: process.env.JWT_SECRET_ADMIN || 'secret',
      });

      if (payload?.type !== 'admin') {
        throw new UnauthorizedException('Admin token emas');
      }

      request['user'] = payload;
      return true;
    } catch (e) {
      throw new UnauthorizedException('Token notogri yoki muddati otgan');
    }
  }

  private extractToken(request: Request): string {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token topilmadi yoki notogri formatda');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token mavjud emas');
    }

    return token;
  }
}
