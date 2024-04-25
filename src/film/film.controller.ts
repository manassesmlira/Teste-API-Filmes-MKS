import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilmService } from './film.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { FilmDomain } from './film.domain';
import { ApiTags } from '@nestjs/swagger';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';

@UseInterceptors(CacheInterceptor)

@ApiTags("Films")
@Controller('film')
export class FilmController {
    constructor(
        private readonly filmsService: FilmService
    ) {}


    @Get()
    @CacheKey("Films-list")
    @UseGuards(AuthGuard(`jwt`))
    async findAllFilms(){        
        return this.filmsService.findAllFilms();
    }

    @Post()
    @UseGuards(AuthGuard(`jwt`))
    async createFilm(@Res() response: Response, @Body() film: FilmDomain) {
        const filmCreated = await this.filmsService.createFilm(film);
        return response.status(201).json(filmCreated);
    }


    @Patch(':id')
    @UseGuards(AuthGuard('jwt'))
    updateFilm(@Res() response: Response, @Body() film: FilmDomain, @Param('id') id: string) {
        this.filmsService.updateFilm(film, id);
        return response.status(201).json({message: "Film Update"});
    }


    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    remove(@Param('id') id: string) {
        return this.filmsService.remove(id);
    }

}
