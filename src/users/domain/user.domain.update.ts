import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class UserUpdateDomain {
   
    

    @IsString({ message: 'Name should be a string'})
    @IsNotEmpty({message: 'Name is required'})
    @IsOptional()
    readonly name: string;

    @IsString({ message: 'Email should be a string'})
    @IsOptional()
    readonly email: string;

    @IsString({ message: 'password should be a string'})
    @IsNotEmpty({message: 'Name is required'})
    @IsOptional()
    readonly password: string;

    

}