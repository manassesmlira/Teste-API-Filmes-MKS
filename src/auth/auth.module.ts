import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt-strategy';
import { AuthController } from './auth.controller';
import { FilmService } from 'src/film/film.service';
;

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
