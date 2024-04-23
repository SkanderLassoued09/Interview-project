import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthGuardRest } from 'src/auth/auth-guard';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('/createBook')
  create(@Body() createBookDto: CreateBookDto) {
    console.log('🍅[createBookDto]:', createBookDto);
    return this.bookService.create(createBookDto);
  }
  @UseGuards(AuthGuardRest)
  @Get('/getBooks')
  getAllBooks(@Request() req) {
    try {
      const { username } = req.user;
      console.log('🥞[username]:', username);
      if (username === 'skander') {
        return this.bookService.getBooks();
      } else {
        throw new Error('Unauthorized');
      }
    } catch (error) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED, error);
    }
  }

  @Get('/bookById/:id')
  findOne(@Param('id') id: string) {
    try {
      const isFound = this.bookService.findBookById(id);
      if (isFound) {
        return isFound;
      } else {
        throw new Error('Book not found');
      }
    } catch (error) {
      throw new HttpException('Error', error);
    }
  }

  @Patch('/updateBook/:id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    try {
      const isExist = this.bookService.findBookById(id);
      if (isExist) {
        return this.bookService.update(id, updateBookDto);
      } else {
        throw new Error('Book not found to update it ');
      }
    } catch (error) {
      throw new HttpException('Error', error);
    }
  }

  @Delete('/deleteBook/:id')
  remove(@Param('id') id: string) {
    try {
      const isExist = this.bookService.findBookById(id);
      if (isExist) {
        return this.bookService.remove(+id);
      } else {
        throw new Error('Book not found to delete it ');
      }
    } catch (error) {
      throw new HttpException('Error', error);
    }
  }
}
