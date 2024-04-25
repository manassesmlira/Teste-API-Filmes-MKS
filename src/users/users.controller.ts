import { Body, Controller, Get, Post, Put, Res, UseGuards } from '@nestjs/common'; 
import { Response } from 'express';
import { UsersService } from './users.service';
import { UserDomain } from './user.domain';
import { AuthGuard } from '@nestjs/passport';
import { UserUpdateDomain } from './user.domain.update';
import { getUser } from './decorators/getUser-decorator';
import { ApiTags } from '@nestjs/swagger';


@ApiTags("Users")
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async findAllUsers(@Res() response: Response){
       const users = await this.usersService.findAllUsers();
       return response.status(200).json(users);
    }

    @Post()
    async createUser(@Res() response: Response, @Body() user: UserDomain) {
        const userCreated = await this.usersService.createUser(user);

        return response.status(201).json(userCreated);
    }

    @Put()
    @UseGuards(AuthGuard('jwt'))
    async updateUser(@Res() response: Response, @Body() user: UserUpdateDomain, @getUser() userLogged) {
        const userUpdate = await this.usersService.updateUser(user, userLogged.id);

        return response.status(201).json(userUpdate);
    }






}
