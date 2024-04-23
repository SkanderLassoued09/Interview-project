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
      if (username === 'skander') {
        return this.bookService.getBooks();
      } else {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
    } catch (error) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED, error);
    }
  }

  @Get('/bookById/:id')
  async findOne(@Param('id') id: string) {
    try {
      const isFound = await this.bookService.findBookById(id);
      console.log('🍝[isFound]:', isFound);
      if (isFound) {
        return isFound;
      } else {
        throw new HttpException(
          `Book with id:${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Error finding a book',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('/updateBook/:id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    try {
      const isUpdated = await this.bookService.update(id, updateBookDto);
      if (isUpdated.acknowledged && isUpdated.modifiedCount > 0) {
        return { message: `Book with id:${id} updated successfully` };
      } else {
        throw new HttpException(
          'Book not found or could not be deleted',
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Error updating book',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/deleteBook/:id')
  async remove(@Param('id') id: string) {
    try {
      const isDeleted = await this.bookService.remove(id);
      if (isDeleted.deletedCount && isDeleted.deletedCount > 0) {
        return { message: 'Book deleted successfully', id };
      } else {
        throw new HttpException(
          'Book not found or could not be deleted',
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Error deleting book',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
