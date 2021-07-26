import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class FilterBookDto {
  @ApiProperty({ description: 'Название книги', required: false })
  @Transform(({ value }) => value || '', { toClassOnly: true })
  name: string;

  @ApiProperty({ description: 'Автор', required: false })
  @Transform(({ value }) => value || '', { toClassOnly: true })
  author: string;

  @ApiProperty({ description: 'Описание', required: false })
  @Transform(({ value }) => value || '', { toClassOnly: true })
  description: string;

  @ApiProperty({ description: 'Год от, в формате "yyyy"', required: false })
  @Transform(({ value }) => Number(value) || null, { toClassOnly: true })
  dateFrom: number;

  @ApiProperty({ description: 'Год до, в формате "yyyy"', required: false })
  @Transform(({ value }) => Number(value) || null, { toClassOnly: true })
  dateTo: number;

  @Expose()
  @Transform(
    ({ value }) => {
      if (value && !Array.isArray(value)) {
        return [Number(value)];
      } else if (value) {
        return value.map((item) => Number(item));
      }
      return [];
    },
    {
      toClassOnly: true,
    },
  )
  @ApiProperty({
    description: 'Список id жанров',
    type: Number,
    required: false,
    isArray: true,
  })
  genreIds: number[];
}
