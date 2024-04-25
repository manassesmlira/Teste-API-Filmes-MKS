//espelho tabela db

import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn,UpdateDateColumn } from 'typeorm'


@Entity({name: 'film'})
export class Film {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'title', nullable: false})
    title: string;

    @Column({name: 'description', nullable: true})
    description: string;

    @Column({name: 'genero', nullable: false})
    genero: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;
}