import { Inject, Injectable } from '@nestjs/common';
import { Film } from './entities/film.entity';
import { Repository } from 'typeorm'
import { FilmDomain } from './domain/film.domain';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';

@Injectable()
export class FilmService {
    constructor(

        //alteracao cache inicia aqui
        
        @Inject('CACHE_MANAGER') private cacheManager: Cache,
        
        //alteracao cache termina aqui

        @InjectRepository(Film)
        private readonly filmRepository: Repository<Film>
    ) { }

//alteracao cache inicia aqui
    // async getFilms() {
    //     const cacheData = await this.cacheManager.get('films');
    //     if(cacheData) {
            
    //         return cacheData;            
    //     }
    //     const filmsData = await this.findAllFilms();
    //     await this.cacheManager.set('films', filmsData, 60 * 10000);
    //     return filmsData;
    // }

   

//alteracao cache termina aqui

   async createFilm(film: FilmDomain): Promise<FilmDomain> {
        const createdFilm = await this.filmRepository.save(film);
        return createdFilm;
    }

    async findAllFilms(): Promise<Film[]> {
        const films = await this.filmRepository.find();
        return films;
     }


    updateFilm(film: FilmDomain, id: string) {
        this.filmRepository.update(id, film);
    
    }


    remove(id: string) {
        return this.filmRepository.delete(id);
      }

}