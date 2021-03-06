import { ApiProperty } from '@nestjs/swagger';
import * as Joi from '@hapi/joi';
import { Expose, Transform } from 'class-transformer';
import * as uniqueId from 'lodash/uniqueId';

export class CreateBookDto {
  @Expose()
  @Transform(({ value }) => value || +uniqueId(), { toClassOnly: true })
  @ApiProperty({ required: true })
  id: number;

  @ApiProperty({ description: 'Название книги', required: true })
  name: string;

  @ApiProperty({ description: 'Автор', required: true })
  author: string;

  @ApiProperty({ description: 'Описание', required: false })
  description: string;

  @ApiProperty({ description: 'Год в формате "yyyy"', required: true })
  year: number;

  @ApiProperty({
    description: 'Список id жанров',
    required: true,
    type: 'number',
    isArray: true,
  })
  genreIds?: number[];
}

export const schemaBook = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  author: Joi.string().required(),
  year: Joi.number().required(),
  genreIds: Joi.any().required(),
  description: Joi.string().allow(null, ''),
});
