import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Users } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { ExtractJwt,Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usersService: UsersService) {
    super({
      secretOrKey: process.env.TOKEN_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
        
  }

  async validate(payload: JwtPayload): Promise<Users> {
    const { email } = payload;
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}