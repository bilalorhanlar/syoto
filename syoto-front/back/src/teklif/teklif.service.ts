import { Injectable } from '@nestjs/common';
import { UpdateTeklifDto } from './dto/update-teklif.dto';
import { TeklifEntity } from './entities/teklif.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { YapilanlarEntity } from 'src/yapilanlar/entities/yapilanlar.entity';

@Injectable()
export class TeklifService {
  constructor(
    @InjectRepository(TeklifEntity) private databaseRepository: Repository<TeklifEntity>,) {}
  
  create(CreateStokDto: TeklifEntity) {
    return this.databaseRepository.save(CreateStokDto);
  }

  findAll() {
    return this.databaseRepository.find();
  }

  async findOne( id : number) {
    const result = await this.databaseRepository.find({ 
      where: { 
        teklif_id : id,
      }
    });
    console.log(result);
    return result;
  }

  update(id: number, updateStokDto: UpdateTeklifDto) {
    return `This action updates a #${id} stok`;
  }
  removeAll() {
    return this.databaseRepository.delete({});
  }
  
  remove(teklif_id: number) {
    return this.databaseRepository.delete({"teklif_id" : teklif_id});
  }

}
