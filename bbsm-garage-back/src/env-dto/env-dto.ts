import * as dotenv from 'dotenv';

export class EnvDto {
    public DB_HOST: string;
    public DB_PORT: string;
    public DB_USER: string;
    public DB_PASS: string;
    public DB_NAME: string;    
    
    constructor() {
        dotenv.config();
        this.DB_HOST = process.env.DB_HOST;
        this.DB_PORT = process.env.DB_PORT;
        this.DB_USER = process.env.DB_USERNAME;
        this.DB_PASS = process.env.DB_PASSWORD;
        this.DB_NAME = process.env.DB_DATABASE;
    }

}
