import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';



@Schema({ id: true })
export class Quote {
  id: string;

  @Prop({
    required: true,
  })
  key: string;

  @Prop()
  date: Date;

  @Prop()
  open: number;

  @Prop()
  high: number;

  @Prop()
  low: number;

  @Prop()
  close: number;

  @Prop()
  adjClose: number;

  @Prop()
  volume: number;
}

export type QuoteDocument = Quote & Document;
export const QuoteSchema = SchemaFactory.createForClass(Quote);
QuoteSchema.index({ key: { key: 1 } });

QuoteSchema.set('id', true);
QuoteSchema.set('timestamps', true);
QuoteSchema.set('toJSON', {
  virtuals: true,
  transform: (doc) => {
    const obj = doc.toObject();
    delete obj._id;
    delete obj.__v;
    return obj;
  },
});
QuoteSchema.set('toObject', {
  virtuals: true,
});
