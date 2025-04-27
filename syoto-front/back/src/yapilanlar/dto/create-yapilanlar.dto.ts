import { CardEntity } from "src/card/entities/card.entity";
import { TeklifEntity } from "src/teklif/entities/teklif.entity";

export class CreateYapilanlarDto {
  // kart: CardEntity;
  // teklif: TeklifEntity;
  card_id : number;
  teklif_id : number;
  adet: number;
  parcaAdi: string;
  fiyat: number;
  }
