import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvDto } from './env-dto/env-dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { log } from 'console';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthEntity } from './auth/auth.entity';
import { CardModule } from './card/card.module';
import { StokModule } from './stok/stok.module';
import { TeklifModule } from './teklif/teklif.module';
import { YapilanlarModule } from './yapilanlar/yapilanlar.module';
import { ExcelModule } from './excel/excel.module';
import { HttpModule } from '@nestjs/axios';

let env = new EnvDto();

log(env); 

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    CardModule,
    StokModule,
    TeklifModule,
    YapilanlarModule,
    ExcelModule,
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
