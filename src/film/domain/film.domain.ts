import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class FilmDomain {
    @ApiProperty({
        description: "O id e o codigo identificador unico para cada filme",
        example: "6a5fdc5d-bf6e-4718-8327-86edae1da1da",
    })
    @IsOptional()
    @IsString({ message: 'ID should be a string'})
    readonly id?: string;


    @ApiProperty({
        description: "O titulo e o nome original do filme",
        example: "Vingadores",
    })
    @IsString({ message: 'Title should be a string'})
    @IsNotEmpty({message: 'Title is required'})
    readonly title: string;

    
    @ApiProperty({
        description: "A descricao traz um pequeno resumo do filme",
        example: "Vingadores e um filme de luta, acao, comedia baseado nos quadrinhos da marvel comics",
    })
    @IsString({ message: 'description should be a string'})
    @IsNotEmpty({message: 'Description is required'})
    readonly description: string;


    @ApiProperty({
        description: "O genero identifica o tipo do filme, qual o foco principal",
        example: "Comedia",
    })
    @IsString({ message: 'Genero should be a string'})
    @IsNotEmpty({message: 'Genero is required'})
    readonly genero: string;


    readonly createdAt?: string;
    readonly updatedAt?: string;

}