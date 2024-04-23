import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './entities/book.entity';
import { Model } from 'mongoose';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
  ) {}

  private async generateDiId(): Promise<number> {
    let bookIndex = 0;
    const lastBook = await this.bookModel.findOne(
      {},
      {},
      { sort: { createdAt: -1 } },
    );

    if (lastBook) {
      bookIndex = +lastBook._id.substring(4);

      return bookIndex + 1;
    }

    return bookIndex;
  }

  async create(createBookDto: CreateBookDto) {
    const bookIndexCreation = await this.generateDiId();

    createBookDto._id = `BOOK${bookIndexCreation}`;
    return await new this.bookModel(createBookDto).save();
  }

  async getBooks() {
    return await this.bookModel.find();
  }

  async findBookById(_id: string) {
    return await this.bookModel.findById(_id);
  }

  async update(_id: string, updateBookDto: UpdateBookDto) {
    const { title, author, ISBN } = updateBookDto;
    return await this.bookModel.updateOne(
      { _id },
      {
        $set: {
          title,
          author,
          ISBN,
        },
      },
    );
  }

  async remove(_id: string) {
    return await this.bookModel.deleteOne({ _id });
  }
}
