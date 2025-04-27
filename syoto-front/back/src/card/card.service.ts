import { Injectable } from '@nestjs/common';
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

  async updateCardYapilanlar(CreateYapilanlarDto : CreateYapilanlarDto, id : number){
    let card = await this.databaseRepository.findOne({ where: { card_id: id }, relations: ['yapilanlar'] });
    
    let yeniYapilan = new YapilanlarEntity();
    yeniYapilan.adet = CreateYapilanlarDto.adet;
    yeniYapilan.parcaAdi = CreateYapilanlarDto.parcaAdi;
    yeniYapilan.fiyat = CreateYapilanlarDto.fiyat;
    yeniYapilan.card = card;

    await this.yapilanlarRepository.save(yeniYapilan);

    // Kartı kaydet (gerekirse)
    // Bu adım kart ile Yapilanlar arasındaki ilişkiyi güncellemek için gerekli
    return this.databaseRepository.save(card);
  }
  


  async create(createCardDto: CreateCardDto) {
    let a = null;
    try {
      console.log(createCardDto);
  
      // Kartı oluştur ve kaydet
      let card = this.databaseRepository.create(createCardDto);
      // a = card.card_id;
      let savedCard = await this.databaseRepository.save(card);
  
      // Eğer yapilanlar varsa işlem yap
      if (createCardDto.yapilanlar && createCardDto.yapilanlar.length > 0) {
        // Her bir yapilanlarDto için işlem yap
        for (const yapilanlarDto of createCardDto.yapilanlar) {
          // Yapilanları oluştur
          let yapilanlar = this.yapilanlarRepository.create({
            ...yapilanlarDto,
            card: savedCard, // Kart referansını ata
          });
          a = yapilanlar;
          // Yapilanları kaydet
          await this.yapilanlarRepository.save(yapilanlar); // belki olur ne return ü istediğine bakılacak
        }
      }
  
      console.log("İşlem başarıyla tamamlandı.");
    } catch (error) {
      console.error(error);
      console.log("Hata oluştu!");
    }
    if(a != null)
      return a;
          // return this.databaseRepository.find({where : {"card_id" : a}, relations:["yapilanlar"]});
  }

  findAll() {
    return this.databaseRepository.find({ relations: ['yapilanlar'] });
  }

  async findYapilanlarByCardId(card_id: number) {
    return this.databaseRepository.findOne({
      where: { card_id },
      relations: ['yapilanlar'],
    })
  }
  

  update(card_id: number, updateCardDto: CardEntity) {
    // Güncelleme
    return `This action updates a #${card_id} card`;
  }

  async removeAll() {
    try {
      let cards = await this.databaseRepository.find({ relations: ['yapilanlar'] });
  
      for (const card of cards) {
        let yapilanlar = card.yapilanlar;
  
        if (yapilanlar && yapilanlar.length > 0) {
          // Yapilanları sil
          await Promise.all(yapilanlar.map(async (yapilan) => {
            await this.yapilanlarRepository.delete(yapilan.id);
          }));
        }
  
        // Kartı sil
        await this.remove(card.card_id);
      }
  
      console.log("Tüm veriler başarıyla silindi.");
    } catch (error) {
      console.error("Hata oluştu:", error);
    }
  }
  
  remove(card_id: number) {
    return this.databaseRepository.delete({ card_id });
  }
}
