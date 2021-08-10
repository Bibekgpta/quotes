import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { env } from './env';
import { QuotesModule } from './quotes/quotes.module';

@Module({
  imports: [
    QuotesModule,
    ConfigModule.forRoot({
      load: [env],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>('database_url'),
          authSource: configService.get<string>('auth_databae'),
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
