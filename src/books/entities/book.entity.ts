import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Genre } from '../../genre/entities/genre.entity';

export class Book {
  @ApiProperty({ required: false })
  id: number;

  @ApiProperty({ description: 'Название книги', required: true })
  name: string;

  @ApiProperty({ description: 'Автор', required: true })
  author: string;

  @ApiProperty({ description: 'Год в формате "yyyy"', required: true })
  date: number;

  @Expose()
  @ApiProperty({
    description: 'Жанр',
    type: Genre,
    isArray: true,
    required: true,
  })
  genre: Genre[];

  @ApiProperty({ required: false })
  description?: string;
}
