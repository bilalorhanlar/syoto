import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StokService } from './stok.service';
import { CreateStokDto } from './dto/create-stok.dto';
import { UpdateStokDto } from './dto/update-stok.dto';
import { StokEntity } from './entities/stok.entity';

@Controller('stok')
export class StokController {
  constructor(private readonly stokService: StokService) {}

  @Post()
  create(@Body() createStokDto: StokEntity) {
    return this.stokService.create(createStokDto);
  }

  @Get()
  findAll() {
    return this.stokService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stokService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStokDto: UpdateStokDto) {
    return this.stokService.update(+id, updateStokDto);
  }

  @Delete("delAll") 
    removeAll() {
      return this.stokService.removeAll();
    }
  

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log(id);
    return this.stokService.remove(+id);
  }

}
