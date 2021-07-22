import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  books: Map<any, Book> = new Map();

  create(createBookDto: CreateBookDto) {
    const book = plainToClass(CreateBookDto, createBookDto);
    this.books.set(book.id, book);
    return 'This action adds a new book';
  }

  findAll(): Book[] {
    return Array.from(this.books.values());
  }

  findOne(id: number): Book {
    return this.books.get(id);
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    const book = this.books.get(id);
    this.books.set(id, { ...book, ...updateBookDto });
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    this.books.delete(id);
    return `This action removes a #${id} book`;
  }
}
