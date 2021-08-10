import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  FilterQuery,
  LeanDocument,
  Model,
  _AllowStringsForIds,
} from 'mongoose';
import { IQuery, Quote, QuoteDocument } from '../models';

@Injectable()
export class QuotesService {
  constructor(
    @InjectModel(Quote.name)
    private quoteModel: Model<QuoteDocument>
  ) {}

  create(data: Quote): Promise<QuoteDocument> {
    return this.quoteModel.create(data);
  }

  findById(id: string): Promise<QuoteDocument> {
    return this.quoteModel.findById(id).exec();
  }

  inserMany(data: Quote[]): Promise<QuoteDocument[]> {
    return this.quoteModel.insertMany(data);
  }

  getKeys(term: string): Promise<QuoteDocument[]> {
    return this.quoteModel
      .distinct('key', { key: { $regex: new RegExp(`^${term}`, 'i') } })
      .exec();
  }

  find(query: IQuery): Promise<QuoteDocument[]> {
    const limit = query.pageSize ? +query.pageSize : 25;
    const skip = (+query.page || 0) * limit;
    const where: FilterQuery<
      _AllowStringsForIds<LeanDocument<QuoteDocument>>
    >[] = [{ key: query.key }];
    if (query.start) where.push({ date: { $gte: query.start } });
    if (query.end) where.push({ date: { $lte: query.end } });

    return this.quoteModel
      .find({
        $and: where,
      })
      .skip(skip)
      .limit(limit)
      .exec();
  }

  count(query: IQuery): Promise<number> {
    const where: FilterQuery<
      _AllowStringsForIds<LeanDocument<QuoteDocument>>
    >[] = [{ key: query.key }];
    if (query.start) where.push({ date: { $gte: query.start } });
    if (query.end) where.push({ date: { $lte: query.end } });

    return this.quoteModel
      .count({
        $and: where,
      })
      .exec();
  }
}
