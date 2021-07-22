import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import * as uniqueId from 'lodash/uniqueId';
import { Book } from '../entities/book.entity';

export class CreateBookDto extends Book {
  @Expose()
  @Transform(() => +uniqueId(), { toClassOnly: true })
  @ApiProperty()
  id: number;
}
