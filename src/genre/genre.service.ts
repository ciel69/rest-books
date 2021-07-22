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
  ];

  create(createGenreDto: CreateGenreDto) {
    return 'This action adds a new genre';
  }

  findAll(): Genre[] {
    return this.genre;
  }

  findOne(id: number) {
    return `This action returns a #${id} genre`;
  }

  update(id: number, updateGenreDto: UpdateGenreDto) {
    return `This action updates a #${id} genre`;
  }

  remove(id: number) {
    return `This action removes a #${id} genre`;
  }
}
