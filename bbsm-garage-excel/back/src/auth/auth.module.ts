import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthEntity } from './auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Çevresel değişkeni kullan
      signOptions: { expiresIn: '3m' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
