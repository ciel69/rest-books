import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Book } from './entities/book.entity';
import { CreateBookDto, schemaBook } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { GenreService } from '../genre/genre.service';
import { FilterBookDto } from './dto/filter-book.dto';
import * as isEmpty from 'lodash/isEmpty';

@Injectable()
export class BooksService {
  books: Map<any, Book> = new Map();

  constructor(public genreService: GenreService) {}

  create(createBookDto: CreateBookDto) {
    const { error } = schemaBook.validate(createBookDto);
    if (error) {
      throw new HttpException(
        'Не заполнены обязательные поля',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const genres = this.genreService.findByIds(createBookDto.genreIds);
    if (!genres.length) {
      throw new HttpException(
        'Жанр не заполнен или нет такого жанра',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newBook = plainToClass(CreateBookDto, createBookDto);
    const book = new Book();
    book.id = newBook.id;
    book.author = newBook.author;
    book.name = newBook.name;
    book.year = newBook.year;
    book.description = newBook.description;
    book.genres = genres;

    this.books.set(book.id, book);
    return 'This action adds a new book';
  }

  findAll(filterBookDto: FilterBookDto): Book[] {
    const books = Array.from(this.books.values());
    if (isEmpty(filterBookDto)) {
      return books;
    }
    const filter = plainToClass(FilterBookDto, filterBookDto);
    return books.filter((book) => {
      return !!(
        this.filterGenre(filter, book) &&
        this.filterDate(filter, book) &&
        this.filterName(filter, book) &&
        this.filterAuthor(filter, book) &&
        this.filterDescription(filter, book)
      );
    });
  }

  filterGenre(filter: FilterBookDto, book: Book): boolean {
    return filter.genreIds.length > 0
      ? !!book.genres.find((item) => filter.genreIds.includes(item.id))
      : true;
  }

  filterDate(filter: FilterBookDto, book: Book): boolean {
    return (
      (filter.yearFrom ? filter.yearFrom <= book.year : true) &&
      (filter.yearTo ? filter.yearTo >= book.year : true)
    );
  }

  filterName(filter: FilterBookDto, book: Book): boolean {
    return filter.name ? book.name.search(filter.name) != -1 : true;
  }

  filterAuthor(filter: FilterBookDto, book: Book): boolean {
    return filter.author ? book.author.search(filter.author) != -1 : true;
  }

  filterDescription(filter: FilterBookDto, book: Book): boolean {
    return filter.description
      ? book.description.search(filter.description) != -1
      : true;
  }

  findOne(id: number): Book {
    return this.books.get(id);
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    const book = this.books.get(id);
    if (!book) {
      throw new HttpException(
        'Нет такой книги',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const genres = updateBookDto.genreIds
      ? this.genreService.findByIds(updateBookDto.genreIds)
      : [];

    delete updateBookDto.genreIds;

    let newBook = { ...book, ...updateBookDto };

    if (genres.length > 0) {
      newBook = {
        ...newBook,
        genres,
      };
    }

    this.books.set(id, newBook);
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    const book = this.books.get(id);
    if (!book) {
      throw new HttpException(
        'Нет такой книги',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    this.books.delete(id);
    return `This action removes a #${id} book`;
  }
}
