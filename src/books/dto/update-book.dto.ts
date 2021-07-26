import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookDto {
  @ApiProperty({ description: 'Название книги', required: false })
  name: string;

  @ApiProperty({ description: 'Автор', required: false })
  author: string;

  @ApiProperty({ description: 'Описание', required: false })
  description: string;

  @ApiProperty({ description: 'Год в формате "yyyy"', required: false })
  date: number;

  @ApiProperty({
    description: 'Список id жанров',
    required: true,
    type: 'number',
    isArray: true,
  })
  genreIds: number[];
}
