import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get()
  redirectBase(@Res() res: Response) {
    const redirectUrl =
      process.env.BASE_FRONT_URL || 'https://muarrix.uz';

    return res.redirect(302, redirectUrl);
  }
}
