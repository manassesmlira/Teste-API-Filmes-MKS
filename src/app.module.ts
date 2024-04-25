import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FilmModule } from './film/film.module';
import { CacheModule } from '@nestjs/cache-manager';
import config from './config';
import { redisStore } from 'cache-manager-redis-yet';



@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    CacheModule.registerAsync(
      {
        isGlobal: true,
        useFactory: async (config) => {
          const store = await redisStore({
            ttl: 30 * 1000,
            socket: {
              host: config.get('redis.host'),
              port: config.get('redis.port'),
            }
          });
          return {store};
        },
        inject: [ConfigService],
      }
    ),

   
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      synchronize: true,
      logging: false,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],

    }),
    UsersModule,
    AuthModule,
    FilmModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
