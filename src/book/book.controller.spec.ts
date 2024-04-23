import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { JwtService } from '@nestjs/jwt';
import { Book, BookDTO } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';

jest.mock(
  'C:UsersSkander.LASSOUEDDesktopBook project\booksrcauthauth-guard.ts',
);
describe('--BookController--', () => {
  let bookController: BookController;
  let bookService: BookService;
  let jwtService: JwtService;
  let module: TestingModule;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [BookService],
    }).compile();

    bookController = module.get<BookController>(BookController);
    bookService = module.get<BookService>(BookService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('--Create a book--', () => {
    it('should return a book object', async () => {
      const expectedResult = new Book();
      const createBookDto = new CreateBookDto();
      jest
        .spyOn(bookService, 'create')
        .mockResolvedValue(expectedResult as any);
      expect(await bookController.create(createBookDto)).toBe(expectedResult);
    });
  });

  it('should be defined', () => {
    expect(bookController).toBeDefined();
  });
});
