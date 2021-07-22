import { ApiProperty } from '@nestjs/swagger';

export class Genre {
  @ApiProperty({ description: 'Название жанра' })
  id: number;

  @ApiProperty()
  name: string;
}
