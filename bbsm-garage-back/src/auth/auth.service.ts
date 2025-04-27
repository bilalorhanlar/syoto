import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from './auth.entity';
import { AuthDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity) private databaseRepository: Repository<AuthEntity>,
    private readonly jwtService: JwtService
  ) {}

  findAll(): any {
    return this.databaseRepository.find();
  }

  addOne(database: AuthDto): Promise<AuthEntity> {
    return this.databaseRepository.save(database);
  }

  async findUserPass(database: AuthDto) {
    if (!database.username || !database.password) {
      return null;
    }
    const result = await this.databaseRepository.find({
      where: { 
        username: database.username, 
        password: database.password
      }
    });
  
    if (result.length > 0) {
      const payload = { username: database.username, sub: result[0].id };
      const token = this.jwtService.sign(payload);
      return { result: true, token };
    } else {
      return { result: false };
    }
  }
  
  async refreshToken(oldToken: string) {
    try {
      const payload = this.jwtService.verify(oldToken, { ignoreExpiration: true });
      const newToken = this.jwtService.sign({ username: payload.username, sub: payload.sub });
      return { newToken };
    } catch (error) {
      throw new Error('Invalid token');
    }
  }  
}
