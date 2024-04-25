import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Authentication")
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  async login(@Body() body) {
    return this.authService.validarUsuario(body.username, body.pass);
  }

  @Post('auth/refresh')
  reautenticar(@Body() body) {
    return this.authService.reautenticar(body); 
  }




}
