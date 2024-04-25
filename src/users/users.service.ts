import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { Users } from './entities/user.entity';
import { UsersDto } from './users.dto';
import { UserDomain } from './domain/user.domain';
import { UserUpdateDomain } from './domain/user.domain.update';



@Injectable()
export class UsersService {
    constructor(
        
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>
    ) { }

    



    async findAllUsers(): Promise<Users[]> {
       const users = await this.usersRepository.find();
       return users;
    }

    async createUser(user: UserDomain): Promise<UserDomain> {
        const createdUser = await this.usersRepository.save(user);
        return createdUser;
    }

    findOneByEmail(username: string) {
        return this.usersRepository.findOneBy({ email: username });
      }

    updateUser(user: UserUpdateDomain, id: string) {
        this.usersRepository.update(id, user);
    
    }

}
