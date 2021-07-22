import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GenreService } from './genre.service';
import { Genre } from './entities/genre.entity';

@ApiTags('genre')
@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  @ApiOperation({
    summary: 'Список жанров',
  })
  @ApiResponse({
    status: 200,
    description: 'The found record.',
    type: Genre,
    isArray: true,
  })
  findAll(): Genre[] {
    return this.genreService.findAll();
  }
}
