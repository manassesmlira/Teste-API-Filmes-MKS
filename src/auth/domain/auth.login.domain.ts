import { ApiProperty } from "@nestjs/swagger";

export class LoginDomain{
    @ApiProperty({
        description : "email de login do usuario",
	    example: "roberto@teste.com",
    })
    username: string;
    
    @ApiProperty({
        description : "senha de acesso",
	    example: "123456",
    })
    pass: string;


}

