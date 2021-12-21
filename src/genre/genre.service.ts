import { Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenreService {
  genre: Genre[] = [
    {
      id: 1,
      name: 'эпопея',
    },
    {
      id: 2,
      name: 'роман',
    },
    {
      id: 3,
      name: 'повесть',
    },
    {
      id: 4,
      name: 'рассказ',
    },
    {
      id: 5,
      name: 'новелла',
    },
    {
      id: 6,
      name: 'очерк',
    },
    {
      id: 7,
      name: 'ода',
    },
    {
      id: 8,
      name: 'лирическое стихотворение',
    },
    {
      id: 9,
      name: 'элегия',
    },
    {
      id: 10,
      name: 'эпиграмма',
    },
    {
      id: 11,
      name: 'комедия',
    },
    {
      id: 12,
      name: 'трагедия',
    },
  ];

  create(createGenreDto: CreateGenreDto) {
    return 'This action adds a new genre';
  }

  findAll(): Genre[] {
    return this.genre;
  }

  findByIds(ids: number[]): Genre[] {
    return this.genre.filter((item) => ids.includes(item.id));
  }

  findOne(id: number): Genre[] {
    return this.genre.filter((item) => item.id === id);
  }

  update(id: number, updateGenreDto: UpdateGenreDto) {
    return `This action updates a #${id} genre`;
  }

  remove(id: number) {
    return `This action removes a #${id} genre`;
  }
}
