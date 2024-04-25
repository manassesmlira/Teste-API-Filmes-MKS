import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
  .setTitle('API-Rest Usuarios e Filmes | Teste MKS')
  .setDescription('Este projeto é uma API REST feita Nestjs. Usando o banco de dados Postgres e autenticação com Jwt Token. Nela é possível cadastrar usuário, e o usuário consegue editar seus dados, cadastrar filmes, editar filmes, listar usuários e filmes, bem como deletar filmes.')
  .setVersion('1.0')
  
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT|| 3000);
}
bootstrap();
