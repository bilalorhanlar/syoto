import { Controller, Post, Body, Res } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { Response } from 'express';

@Controller('excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Post('download')
  async downloadExcel(
    @Body() data: any,
    @Res() res: Response,
  ) {
    try {
      const excelBuffer = await this.excelService.generateExcel(data);
      
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=output.xlsx');
      
      return res.send(excelBuffer);
    } catch (error) {
      console.error('Excel download error:', error);
      res.status(500).json({ message: 'Excel download failed', error: error.message });
    }
  }
} 