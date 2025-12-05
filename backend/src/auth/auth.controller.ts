import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';
import { registerDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/login')
  authLogin(@Body() dto: loginDto) {
    return this.authService.login(dto);
  }

  @Post('/register')
  authRegister(@Body() dto: registerDto) {
    return this.authService.register(dto);
  }
}
