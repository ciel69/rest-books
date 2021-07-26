import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { GenreService } from '../genre/genre.service';

@Module({
  imports: [GenreService],
  controllers: [BooksController],
  providers: [GenreService, BooksService],
})
export class BooksModule {}
