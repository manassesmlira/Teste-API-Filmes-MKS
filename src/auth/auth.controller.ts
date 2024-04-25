import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDomain } from './domain/auth.login.domain';

@ApiTags("Authentication")
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  async login(@Body() body: LoginDomain) {
    return this.authService.validarUsuario(body.username, body.pass);
  }

  @Post('auth/refresh')
  reautenticar(@Body() body) {
    return this.authService.reautenticar(body); 
  }




}
