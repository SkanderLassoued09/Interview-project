import { Test, TestingModule } from '@nestjs/testing';

import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';

describe('BooksController', () => {
  let controller: BookController;
  let service: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [BookService],
    }).compile();

    controller = module.get<BookController>(BookController);
    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a book', async () => {
      const createBookDto: CreateBookDto = {
        _id: '1',
        title: 'Test Book',
        author: 'Test Author',
      };
      const expectedResult = { id: '1', ...createBookDto };
      jest.spyOn(service, 'create').mockResolvedValue(expectedResult as any);

      const result = await controller.create(createBookDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getAllBooks', () => {
    it('should get all books for authorized user', async () => {
      const mockUser = { username: 'skander' };
      jest.spyOn(service, 'getBooks').mockResolvedValue([]);

      const result = await controller.getAllBooks({ user: mockUser });
      expect(result).toEqual([]);
    });

    it('should throw unauthorized error for unauthorized user', async () => {
      const mockUser = { username: 'otheruser' };

      await expect(
        controller.getAllBooks({ user: mockUser }),
      ).rejects.toThrowError(
        new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED),
      );
    });
  });

  describe('findOne', () => {
    it('should find a book by id', async () => {
      const mockBookId = '1';
      const expectedResult = {
        id: mockBookId,
        title: 'Test Book',
        author: 'Test Author',
      };
      jest
        .spyOn(service, 'findBookById')
        .mockResolvedValue(expectedResult as any);

      const result = await controller.findOne(mockBookId);
      expect(result).toEqual(expectedResult);
    });

    it('should throw not found error for non-existing book', async () => {
      const mockBookId = '999';

      await expect(controller.findOne(mockBookId)).rejects.toThrowError(
        new HttpException(
          `Book with id:${mockBookId} not found`,
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe('update', () => {
    it('should update a book by id', async () => {
      const mockBookId = '1';
      const updateBookDto: UpdateBookDto = {
        title: 'Updated Book',
        author: 'Updated Author',
      };
      jest
        .spyOn(service, 'update')
        .mockResolvedValue({ acknowledged: true, modifiedCount: 1 } as any);

      const result = await controller.update(mockBookId, updateBookDto);
      expect(result).toEqual({
        message: `Book with id:${mockBookId} updated successfully`,
      });
    });

    it('should throw not found error for non-existing book', async () => {
      const mockBookId = '999';
      const updateBookDto: UpdateBookDto = {
        title: 'Updated Book',
        author: 'Updated Author',
      };

      await expect(
        controller.update(mockBookId, updateBookDto),
      ).rejects.toThrowError(
        new HttpException(
          'Book not found or could not be deleted',
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe('remove', () => {
    it('should delete a book by id', async () => {
      const mockBookId = '1';
      jest
        .spyOn(service, 'remove')
        .mockResolvedValue({ deletedCount: 1 } as any);

      const result = await controller.remove(mockBookId);
      expect(result).toEqual({
        message: 'Book deleted successfully',
        id: mockBookId,
      });
    });

    it('should throw not found error for non-existing book', async () => {
      const mockBookId = '999';

      await expect(controller.remove(mockBookId)).rejects.toThrowError(
        new HttpException(
          'Book not found or could not be deleted',
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });
});
