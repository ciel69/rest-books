import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { FilterBookDto } from './dto/filter-book.dto';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({
    summary: 'Создание книги',
  })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получение списка книг' })
  @ApiResponse({
    status: 200,
    description: 'The found record.',
    type: Book,
    isArray: true,
  })
  findAll(@Query() filterBookDto: FilterBookDto): Book[] {
    return this.booksService.findAll(filterBookDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение конкретной книги по её id' })
  @ApiResponse({
    status: 200,
    description: 'The found record.',
    type: Book,
  })
  findOne(@Param('id') id: number): Book {
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновление данных книги' })
  update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление книги' })
  remove(@Param('id') id: number) {
    return this.booksService.remove(+id);
  }
}
