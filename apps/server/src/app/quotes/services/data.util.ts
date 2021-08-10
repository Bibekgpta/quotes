import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
import * as util from 'util';
import { ConfigService } from '@nestjs/config';
import * as csv from 'csvtojson';
import { Quote } from '../models';

const readdir = util.promisify(fs.readdir);
const exists = util.promisify(fs.exists);

@Injectable()
export class DataUtil {
  constructor(private configService: ConfigService) {}
  async populate(): Promise<Quote[]> {
    console.log(this.configService.get('dataDir'));

    const dataDirPath = join(process.cwd(), this.configService.get('dataDir'));
    const dataExists = await exists(dataDirPath);
    if (!dataExists) {
      console.error('Data not found');
      return [];
    }
    const files = await readdir(dataDirPath);
    let result: Quote[] = [];
    for (const file of files) {
      const filePath = join(dataDirPath, file);
      const data = await csv().fromFile(filePath);
      const queotes = data.map(
        (item) =>
          ({
            date: new Date(item.Date),
            high: +item.High,
            low: +item.Low,
            open: +item.Open,
            close: +item.Close,
            adjClose: +item['Adj Close'],
            volume: +item.Volume,
            key: file.split('.')[0],
          } as Quote)
      );
      result = result.concat(queotes);
    }
    return result;
  }
}
