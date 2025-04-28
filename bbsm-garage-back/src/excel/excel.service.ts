import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class ExcelService {
  constructor(private readonly httpService: HttpService) {}

  async generateExcel(data: any): Promise<Buffer> {
    try {
      const response: AxiosResponse<ArrayBuffer> = await firstValueFrom(
        this.httpService.post('https://13.61.75.15/api/excel/download', data, {
          responseType: 'arraybuffer',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      );

      return Buffer.from(response.data);
    } catch (error) {
      console.error('Error generating excel:', error);
      throw new Error('Failed to generate excel file');
    }
  }
} 