import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AdminJwtGuard } from 'src/guards/AdminJwtGuard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }

  @UseGuards(AdminJwtGuard)
  @Get('/me')
  getMe(@Request() req) {
    return this.authService.getMe(req.user.sub);
  }

  @UseGuards(AdminJwtGuard)
  @Patch('/me')
  updateMe(@Request() req, @Body() updateData: any) {
    return this.authService.updateMe(req.user.sub, updateData);
  }

  @UseGuards(AdminJwtGuard)
  @Patch('/reset-password')
  resetPassword(@Body() body: any, @Request() req) {
    const userId = req.user.sub;
    return this.authService.resetPassword(userId, body.newPassword);
  }
}
