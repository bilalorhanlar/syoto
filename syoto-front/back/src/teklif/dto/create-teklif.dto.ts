import { CreateYapilanlarDto } from "src/yapilanlar/dto/create-yapilanlar.dto";

export class CreateTeklifDto {
    
    adSoyad: string;
    telNo: string;
    markaModel: string;
    plaka: string;
    km: number;
    modelYili: number;
    sasi: string;
    renk: string;
    girisTarihi: Date;
    notlar: string;
    adres: string;
    yapilanlar: CreateYapilanlarDto[];
}
