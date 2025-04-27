import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { CardEntity } from './entities/card.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { YapilanlarEntity } from 'src/yapilanlar/entities/yapilanlar.entity';
import { CreateYapilanlarDto } from 'src/yapilanlar/dto/create-yapilanlar.dto';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardEntity) 
    private databaseRepository: Repository<CardEntity>,
    @InjectRepository(YapilanlarEntity) 
    private yapilanlarRepository: Repository<YapilanlarEntity>,
  ) {}

  async create(createCardDto: CreateCardDto) {
    try {
      // CardEntity oluşturuluyor ve veritabanına kaydediliyor
      const card = await this.databaseRepository.create(createCardDto);
      const savedCard = await this.databaseRepository.save(card);

      // Yapilanlar ekleniyor
      if (createCardDto.yapilanlar && createCardDto.yapilanlar.length > 0) {
        const yapilanlarEntities = createCardDto.yapilanlar.map(dto => {
          const yapilan = new YapilanlarEntity();
          yapilan.birimAdedi = dto.birimAdedi;
          yapilan.parcaAdi = dto.parcaAdi;
          yapilan.birimFiyati = dto.birimFiyati;
          yapilan.toplamFiyat = dto.toplamFiyat;
          yapilan.card = savedCard; // İlişkiyi belirtmek için card referansı ekleniyor
          return yapilan;
        });

        await this.yapilanlarRepository.save(yapilanlarEntities);
      }

      return await this.databaseRepository.findOne({ where: { card_id: savedCard.card_id }, relations: ["yapilanlar"] });
    } catch (error) {
      throw error;
    }
  }

  async updateCardYapilanlar(createYapilanlarDtoArray: CreateYapilanlarDto[], card_id: number) {
    console.log("Gelen Yapilanlar:", createYapilanlarDtoArray);

    let card = await this.databaseRepository.findOne({ where: { card_id }, relations: ['yapilanlar'] });

    if (!card) {
      throw new NotFoundException(`Card ID: ${card_id} bulunamadı.`);
    }

    // Create YapilanlarEntity array
    const yapilanlarEntities: YapilanlarEntity[] = createYapilanlarDtoArray.map(dto => {
      const yapilan = new YapilanlarEntity();
      yapilan.birimAdedi = dto.birimAdedi;
      yapilan.parcaAdi = dto.parcaAdi;
      yapilan.birimFiyati = dto.birimFiyati;
      yapilan.toplamFiyat = dto.toplamFiyat;
      yapilan.card = card; // İlişkiyi belirtmek için card referansı ekleniyor
      return yapilan;
    });

    // Kart ile yapılanları ilişkilendiriyoruz
    card.yapilanlar = yapilanlarEntities;

    await this.databaseRepository.save(card);

    return this.databaseRepository.findOne({ where: { card_id }, relations: ['yapilanlar'] });
  }

  findAll() {
    return this.databaseRepository.find({ relations: ['yapilanlar'] });
  }

  async findYapilanlarByCardId(card_id: number) {
    return this.databaseRepository.findOne({
      where: { card_id },
      relations: ['yapilanlar'],
    });
  }
  
  async update(card_id: number, updateCardDto: any) {
    let card = await this.databaseRepository.findOne({ where: { card_id } });

    if (!card) {
      throw new NotFoundException(`Card ID: ${card_id} bulunamadı.`);
    }

    // Kart bilgilerini güncelleme
    for (let key in updateCardDto) {
      if (updateCardDto.hasOwnProperty(key) && updateCardDto[key] !== undefined) {
        card[key] = updateCardDto[key];
      }
    }

    return this.databaseRepository.save(card);
  }

  async removeAll() {
    try {
      const cards = await this.databaseRepository.find({ relations: ['yapilanlar'] });

      for (const card of cards) {
        await this.databaseRepository.remove(card);
      }

      console.log("Tüm veriler başarıyla silindi.");
    } catch (error) {
      console.error("Hata oluştu:", error);
    }
  }
  
  async removeid(card_id: number) {
    const card = await this.databaseRepository.findOne({ where: { card_id }, relations: ['yapilanlar'] });
    if (card) {
      await this.databaseRepository.remove(card);
      console.log(`Card with ID ${card_id} and its related records have been removed.`);
    } else {
      throw new NotFoundException(`Card with ID ${card_id} not found.`);
    }
  }
}
