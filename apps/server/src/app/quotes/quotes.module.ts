import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuotesController } from './controller';
import { Quote, QuoteSchema } from './models';
import { DataUtil, QuotesService } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quote.name, schema: QuoteSchema }]),
  ],
  controllers: [QuotesController],
  providers: [QuotesService, DataUtil],
})
export class QuotesModule {}
