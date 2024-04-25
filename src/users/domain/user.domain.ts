import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class UserDomain {
    
    @ApiProperty({
        description: "O id e o codigo identificador unico para cada usuario",
        example: "6a5fdc5d-bf6e-4718-8327-86edae1da1da",
    })
    @IsOptional()
    @IsString({ message: 'ID should be a string'})
    readonly id?: string;


    @ApiProperty({
        description: "O nome de cada usuario",
        example: "Manasses Moraes",
    })
    @IsString({ message: 'Name should be a string'})
    @IsNotEmpty({message: 'Name is required'})
    readonly name: string;


    @ApiProperty({
        description: "O email e o endereco eletronico unico do usuario e permite fazer login no sistema junto a senha",
        example: "teste@email.com",
    })
    @IsString({ message: 'Email should be a string'})
    @IsNotEmpty({message: 'Name is required'})
    readonly email: string;


    @ApiProperty({
        description: "A senha, se correta, permite o usuario fazer login no sistema junto ao email",
        example: "123456",
    })
    @IsString({ message: 'password should be a string'})
    @IsNotEmpty({message: 'Name is required'})
    readonly password: string;


    readonly createdAt?: string;
    readonly updatedAt?: string;

}