// database.service.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from './auth.entity';
import { AuthDto } from './auth.dto';
import { log } from 'console';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthEntity) private databaseRepository: Repository<AuthEntity>,) {}

    findAll(): any{
        return this.databaseRepository.find();
    }
    
    addOne(database: AuthDto): Promise<AuthEntity> {
        return this.databaseRepository.save(database);
    }

    async findUserPass(database: AuthDto): Promise<boolean> {
        const result = await this.databaseRepository.find({ 
          where: { 
            username: database.username, 
            password: database.password
          } 
        });
        console.log(result.length);
        return result.length > 0;
      }
}

