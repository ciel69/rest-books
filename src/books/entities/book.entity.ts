import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Genre } from '../../genre/entities/genre.entity';

export class Book {
  @ApiProperty()
  id: number;

  @ApiProperty({ description: 'Название книги' })
  name: string;

  @ApiProperty({ description: 'Автор' })
  author: string;

  @Expose()
  @ApiProperty({ description: 'Жанр', type: Genre, isArray: true })
  genre: Genre[];

  @ApiProperty({ required: false })
  description?: string;
}
