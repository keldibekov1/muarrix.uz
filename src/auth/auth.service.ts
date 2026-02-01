import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto, ResetAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(data: CreateAuthDto) {
    let user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new UnauthorizedException('email or password is incorrect');
    }

    let isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('email or password is incorrect');
    }

    const token = this.jwtService.sign(
      {
        sub: user.id,
        type: 'admin',
        role: user.role,
        email: user.email,
      },
      {
        secret: process.env.JWT_SECRET_ADMIN,
        expiresIn: '7d',
      },
    );

    return { token, role: user.role };
  }

  async getMe(sub: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: sub },
    });

    if (!user) {
      throw new NotFoundException('User topilmadi');
    }

    return user;
  }

  async updateMe(sub: string, data: any) {
    const user = await this.prisma.user.findUnique({
      where: { id: sub },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (data.email && data.email !== user.email) {
      const existing = await this.prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existing && existing.id !== sub) {
        throw new UnauthorizedException('Bu email allaqachon band');
      }
    }

    return this.prisma.user.update({
      where: { id: sub },
      data,
    });
  }

  async resetPassword(sub: string, newPassword: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: sub },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    return this.prisma.user.update({
      where: { id: sub },
      data: { password: hashedPassword },
    });
  }
}
