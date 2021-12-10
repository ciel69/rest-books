import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { CreateBookDto } from '../books/dto/create-book.dto';
import { Book } from '../books/entities/book.entity';
import { FilterBookDto } from '../books/dto/filter-book.dto';
import { UpdateBookDto } from '../books/dto/update-book.dto';
import { BooksService } from '../books/books.service';
import { Genre } from '../genre/entities/genre.entity';
import { GenreService } from '../genre/genre.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly booksService: BooksService,
    private readonly genreService: GenreService,
  ) {}

  @Post('/login')
  @ApiOperation({ summary: 'Авторизация по логину/паролю' })
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  @ApiOperation({ summary: 'Получение текущего пользователя' })
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/books')
  @ApiOperation({
    summary: 'Создание книги',
  })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/books')
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

  @UseGuards(JwtAuthGuard)
  @Get('/books/:id')
  @ApiOperation({ summary: 'Получение конкретной книги по её id' })
  @ApiResponse({
    status: 200,
    description: 'The found record.',
    type: Book,
  })
  findOne(@Param('id') id: number): Book {
    return this.booksService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/books/:id')
  @ApiOperation({ summary: 'Обновление данных книги' })
  update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/books/:id')
  @ApiOperation({ summary: 'Удаление книги' })
  remove(@Param('id') id: number) {
    return this.booksService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/genre')
  @ApiOperation({
    summary: 'Список жанров',
  })
  @ApiResponse({
    status: 200,
    description: 'The found record.',
    type: Genre,
    isArray: true,
  })
  findAllGenre(): Genre[] {
    return this.genreService.findAll();
  }
}
