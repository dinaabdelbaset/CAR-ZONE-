import { Controller, Post, Body, UnauthorizedException, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User login' })
  async login(@Body() loginDto: LoginDto) {
    let user = await this.authService.validateUser(loginDto.email, loginDto.password);
    
    // Auto-register for demo purposes if email doesn't exist at all
    if (!user) {
      const existing = await this.usersService.findByEmail(loginDto.email);
      if (existing) {
        // Email exists but wrong password
        throw new UnauthorizedException('كلمة المرور غير صحيحة');
      }
      // Auto-register
      user = await this.authService.register(loginDto.email.split('@')[0], loginDto.email, loginDto.password);
    }
    
    return this.authService.login(user);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Customer Registration' })
  async register(@Body() body: any) {
    const user = await this.authService.register(body.name, body.email, body.password);
    return this.authService.login(user);
  }
}

