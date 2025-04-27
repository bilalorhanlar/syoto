import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StokEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    stokAdi: string;

    @Column()
    adet: number;

    @Column()
    info: string;

    @Column()
    eklenisTarihi: Date;
    
}
