import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import type { AuthUser } from 'src/auth/types/auth-user.type';
import { updateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) { }

  @UseGuards(JwtGuard)
  @Get('me')
  getMyProfile(@CurrentUser() user: AuthUser) {
    return this.userService.getProfile(user.id);
  }

  @UseGuards(JwtGuard)
  @Get('me/update')
  updateMyProfile(
    @CurrentUser() user: AuthUser,
    @Body() dto: updateUserDto
  ) {
    return this.userService.updateProfile(user.id, dto)
  }
}
