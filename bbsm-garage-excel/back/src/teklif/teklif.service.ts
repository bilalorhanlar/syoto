import { Injectable } from '@nestjs/common';
import { UpdateYapilanlarDto } from '../yapilanlar/dto/update-yapilanlar.dto';
import { UpdateTeklifDto } from "./dto/update-teklif.dto";
import { CreateTeklifDto } from "./dto/create-teklif.dto";
import { TeklifEntity } from "./entities/teklif.entity";
import { YapilanlarEntity } from "../yapilanlar/entities/yapilanlar.entity";
import { Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TeklifService {
  constructor(
    @InjectRepository(TeklifEntity)
    private databaseRepository: Repository<TeklifEntity>,
  ) {}

  async create(createTeklifDto: CreateTeklifDto): Promise<TeklifEntity> {
    const teklif = await this.databaseRepository.create(createTeklifDto as unknown as Partial<TeklifEntity>);
    return this.databaseRepository.save(teklif);
  }

  findAll(): Promise<TeklifEntity[]> {
    return this.databaseRepository.find({ relations: ['yapilanlar'] });
  }

  async findOne(id: number): Promise<TeklifEntity> {
    return await this.databaseRepository.findOne({
      where: { teklif_id: id },
      relations: ['yapilanlar'],
    });
  }

  async update(id: number, updateTeklifDto: UpdateTeklifDto): Promise<TeklifEntity> {
    await this.databaseRepository.update(id, updateTeklifDto as unknown as Partial<TeklifEntity>);
    return this.findOne(id);
  }

  async updateYapilanlar(id: number, updateYapilanlarDto: UpdateYapilanlarDto[]): Promise<TeklifEntity> {
    const teklif = await this.findOne(id);

    // Clear existing yapilanlar and create new ones from the DTO
    teklif.yapilanlar = updateYapilanlarDto.map(dto => {
      const yapilan = new YapilanlarEntity();
      yapilan.id = dto.id;
      yapilan.birimAdedi = dto.birimAdedi;
      yapilan.parcaAdi = dto.parcaAdi;
      yapilan.birimFiyati = dto.birimFiyati;
      yapilan.toplamFiyat = dto.toplamFiyat;
      yapilan.teklif = teklif; // Set the relationship
      return yapilan;
    });

    await this.databaseRepository.save(teklif);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.databaseRepository.delete(id);
  }

  async removeAll(): Promise<void> {
    await this.databaseRepository.clear();
  }
}
