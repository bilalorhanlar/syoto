import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { TeklifService } from './teklif.service';
import { CreateTeklifDto } from './dto/create-teklif.dto';
import { UpdateTeklifDto } from './dto/update-teklif.dto';
import { UpdateYapilanlarDto } from '../yapilanlar/dto/update-yapilanlar.dto'; // Güncellenmiş import yolu

@Controller('teklif')
export class TeklifController {
  constructor(private readonly teklifService: TeklifService) {}

  @Post()
  create(@Body() createTeklifDto: CreateTeklifDto) {
    if (isNaN(createTeklifDto.km)) {
      throw new BadRequestException('km için geçersiz integer değeri');
    }
    if (isNaN(createTeklifDto.modelYili)) {
      throw new BadRequestException('model yılı için geçersiz integer değeri');
    }
    return this.teklifService.create(createTeklifDto);
  }

  @Get()
  findAll() {
    return this.teklifService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teklifService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeklifDto: UpdateTeklifDto) {
    return this.teklifService.update(+id, updateTeklifDto);
  }

  @Patch(':id/yapilanlar')
  updateYapilanlar(@Param('id') id: string, @Body() updateYapilanlarDto: UpdateYapilanlarDto[]) {
    return this.teklifService.updateYapilanlar(+id, updateYapilanlarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teklifService.remove(+id);
  }
}
