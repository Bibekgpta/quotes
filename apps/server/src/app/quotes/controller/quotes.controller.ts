import { Controller, Get, Query } from '@nestjs/common';
import { Quote } from '../models';
import { DataUtil, QuotesService } from '../services';

@Controller('quotes')
export class QuotesController {
  constructor(
    private readonly quotesService: QuotesService,
    private dataUtil: DataUtil
  ) {}

  @Get('populate')
  async populate(): Promise<Quote[]> {
    const quetoes = await this.dataUtil.populate();
    return this.quotesService.inserMany(quetoes);
  }

  @Get('key')
  async getKeys(@Query('k') k: string): Promise<Quote[]> {
    return this.quotesService.getKeys(k);
  }

  @Get()
  async getData(
    @Query('key') key: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('start') start: Date,
    @Query('end') end: Date
  ): Promise<{ total: number; items: Quote[] }> {
    const query = {
      key,
      page,
      pageSize,
      start,
      end,
    };
    const total = await this.quotesService.count(query);
    const items = await this.quotesService.find(query);
    return { total, items };
  }
}
