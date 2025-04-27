import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvDto } from './env-dto/env-dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { log } from 'console';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthEntity } from './auth/auth.entity';
import { CardModule } from './card/card.module';
import { StokModule } from './stok/stok.module';
import { TeklifModule } from './teklif/teklif.module';
import { YapilanlarModule } from './yapilanlar/yapilanlar.module';

let env = new EnvDto();

log(env); 

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: env.DB_HOST,
      port: 5432,
      username: env.DB_USER,
      password: env.DB_PASS,
      database: env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    CardModule,
    StokModule,
    TeklifModule,
    YapilanlarModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
