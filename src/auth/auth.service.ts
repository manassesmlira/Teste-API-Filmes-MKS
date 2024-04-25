import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    validateUsers(username: string, password: string) {
        throw new Error('Method not implemented.');
    }
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService,
      ) {}
      async validarUsuario(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(username);
        if (!user) {
          throw new UnauthorizedException('Usuário ou Senha Inválidos');
        }
        if (user.password === password) {
          return await this.gerarToken(user);
        }
        throw new UnauthorizedException('Usuário ou Senha Inválidos');
      }
    

    //   async gerarToken(payload: Users) {
    //     return {
    //       access_token: this.jwtService.sign(
    //         { email: payload.email },
    //         {
    //           secret: process.env.TOKEN_SECRET,
    //           expiresIn: process.env.TOKEN_EXPIRE,
    //         },
    //         ),
    //       };
    //     }
    //   }

      async gerarToken(payload: Users) {
        const accessToken = this.jwtService.sign(
          { email: payload.email },
          {
            secret: process.env.TOKEN_SECRET,
            expiresIn: process.env.TOKEN_EXPIRE,
          },
        );
    
        const refreshToken = this.jwtService.sign(
          { email: payload.email },
          {
            secret: process.env.TOKEN_REFRESH,
            expiresIn: process.env.TOKEN_EXPIRER,
          },
        );
        return { access_token: accessToken, refresh_token: refreshToken };
    }


    async reautenticar(body) {
        const payload: Users = await this.verificarRefreshToken(body); ////este método também será implementado abaixo
        return this.gerarToken(payload);
      }





      private async verificarRefreshToken(body) {
        const refreshToken = body.refresh_token;
    
    
        if (!refreshToken) {
          throw new NotFoundException('Usuário não encontrado');
        }
    
        const email = this.jwtService.decode(refreshToken)['email'];
        const usuario = await this.usersService.findOneByEmail(email);
    
        if (!usuario) {
          throw new NotFoundException('Usuário não encontrado');
        }
    
        try {
          this.jwtService.verify(refreshToken, {
            secret: process.env.TOKEN_REFRESH,
          });
          return usuario;
        } catch (err) {
          if (err.name === 'JsonWebTokenError') {
            throw new UnauthorizedException('Assinatura Inválida');
          }
          if (err.name === 'TokenExpiredError') {
            throw new UnauthorizedException('Token Expirado');
          }
          throw new UnauthorizedException(err.name);
        }
      }
    }
    
    
    

