import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/strategies/jwt-strategy';
import { JwtModule } from '@nestjs/jwt';



@Module({
  imports: [
    TypeOrmModule.forFeature([Users]), JwtModule.register({})
  ],

  controllers: [UsersController],
  providers: [AuthService, UsersService, JwtStrategy],
  exports: [UsersService],
})
export class UsersModule {}
