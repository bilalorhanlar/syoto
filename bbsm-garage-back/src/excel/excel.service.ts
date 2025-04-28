import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import * as https from 'https';

@Injectable()
export class ExcelService {
  private readonly logger = new Logger(ExcelService.name);

  constructor(private readonly httpService: HttpService) {}

  async generateExcel(data: any): Promise<{ excelBuffer: Buffer, pdfBuffer: Buffer }> {
    try {
      this.logger.log('Generating Excel file with data:', JSON.stringify(data));

      const httpsAgent = new https.Agent({
        rejectUnauthorized: false // Allow self-signed certificates
      });

      // Excel indirme isteği
      const excelResponse: AxiosResponse<ArrayBuffer> = await firstValueFrom(
        this.httpService.post('https://13.61.75.15/api/excel/download', data, {
          responseType: 'arraybuffer',
          headers: {
            'Content-Type': 'application/json',
          },
          httpsAgent: httpsAgent
        })
      );

      // PDF indirme isteği
      const pdfResponse: AxiosResponse<ArrayBuffer> = await firstValueFrom(
        this.httpService.post('https://13.61.75.15/api/pdf/download', data, {
          responseType: 'arraybuffer',
          headers: {
            'Content-Type': 'application/json',
          },
          httpsAgent: httpsAgent
        })
      );

      if (!excelResponse.data || !pdfResponse.data) {
        throw new Error('No data received from services');
      }

      this.logger.log('Excel and PDF files generated successfully');
      return {
        excelBuffer: Buffer.from(excelResponse.data),
        pdfBuffer: Buffer.from(pdfResponse.data)
      };
    } catch (error) {
      this.logger.error('Error generating files:', error);
      this.logger.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw new Error(`Failed to generate files: ${error.message}`);
    }
  }
} 