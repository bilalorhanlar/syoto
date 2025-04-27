import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardEntity } from './entities/card.entity';
import { CreateYapilanlarDto } from 'src/yapilanlar/dto/create-yapilanlar.dto';


@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    if (isNaN(createCardDto.km)) {
      throw new BadRequestException('km için geçersiz integer değeri');
    }
    if (isNaN(createCardDto.modelYili)) {
      throw new BadRequestException('modelYili için geçersiz integer değeri');
    }
    this.cardService.create(createCardDto);
  }

  @Get(':card_id/yapilanlar')
  findYapilanlarByCardId(@Param('card_id') card_id: number) {
    return this.cardService.findYapilanlarByCardId(card_id);
  }

  @Get()
  findAll() {
    return this.cardService.findAll();
  }

  @Post('update-card/:card_id')
  updateCardYapilanlar(@Body() updateYapilan: CreateYapilanlarDto ,@Param('card_id') card_id: number){
    return this.cardService.updateCardYapilanlar(updateYapilan,+card_id);
  }


  // @Get(':id') // Bu yol, ID'ye göre tek bir kart bulmak için kullanılır.
  // findOne(@Param('id') id: string) {
  //   console.log(id);
  //   console.log(parseInt(id, 10))
  //   return this.cardService.findOne(parseInt(id, 10));
  // }

  @Patch(':card_id')
  update(@Param('card_id') card_id: string, @Body() updateCardDto: CardEntity) {
    return this.cardService.update(parseInt(card_id, 10), updateCardDto);
  }

  @Delete("delAll") 
  removeAll() {
    return this.cardService.removeAll();
  }

  @Delete(':card_id')
  remove(@Param('card_id') card_id: string) {
    return this.cardService.remove(parseInt(card_id, 10));
  }
}
