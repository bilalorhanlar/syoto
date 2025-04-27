import { Injectable } from '@nestjs/common';
import { UpdateStokDto } from './dto/update-stok.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StokEntity } from './entities/stok.entity';
import { Repository } from 'typeorm';


@Injectable()
export class StokService {
  constructor(
    @InjectRepository(StokEntity) private databaseRepository: Repository<StokEntity>,) {}
  
  create(CreateStokDto: StokEntity) {
    return this.databaseRepository.save(CreateStokDto);
  }

  findAll() {
    return this.databaseRepository.find();
  }

  async findOne( id : number) {
    const result = await this.databaseRepository.find({ 
      where: { 
        id : id,
      }
    });
    console.log(result);
    return result;
  }

  update(id: number, updateStokDto: UpdateStokDto) {
    return `This action updates a #${id} stok`;
  }
  removeAll() {
    return this.databaseRepository.delete({});
  }
  
  remove(id: number) {
    return this.databaseRepository.delete({"id":id});
  }
x
}
