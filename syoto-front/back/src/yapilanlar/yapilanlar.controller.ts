import { BadRequestException, Body, Controller, Get, Param, Post } from '@nestjs/common';
import { YapilanlarService } from './yapilanlar.service';
import { CreateYapilanlarDto } from './dto/create-yapilanlar.dto';

@Controller('yapilanlar')
export class YapilanlarController {
  constructor(private readonly yapilanlarService: YapilanlarService) {}
  
  @Post()
  create(@Body() createYapilanlarDto: CreateYapilanlarDto) {
    return this.yapilanlarService.create(createYapilanlarDto);
  }

  @Get()
  findAll() {
    return this.yapilanlarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.yapilanlarService.findOne(id);
  }
}
  