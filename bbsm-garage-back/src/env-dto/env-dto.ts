import * as dotenv from 'dotenv';

export class EnvDto {
    // Varsayılan değerler
    private readonly DEFAULT_DB_HOST = "bbsm-garage.c87e0i2s2ugp.us-east-1.rds.amazonaws.com";
    private readonly DEFAULT_DB_PORT = "5432";
    private readonly DEFAULT_DB_USER = "newuser";
    private readonly DEFAULT_DB_PASS = "12345678";
    private readonly DEFAULT_DB_NAME = "newdb";
    private readonly DEFAULT_JWT_SECRET = "your-secret-key-here";
    private readonly DEFAULT_DB_SSL = true;

    public DB_HOST: string;
    public DB_PORT: string;
    public DB_USER: string;
    public DB_PASS: string;
    public DB_NAME: string;
    public JWT_SECRET: string;
    public DB_SSL: boolean;
    
    constructor() {
        dotenv.config();
        
        // .env'den çek, yoksa varsayılan değerleri kullan
        this.DB_HOST = process.env.DB_HOST || this.DEFAULT_DB_HOST;
        this.DB_PORT = process.env.DB_PORT || this.DEFAULT_DB_PORT;
        this.DB_USER = process.env.DB_USERNAME || this.DEFAULT_DB_USER;
        this.DB_PASS = process.env.DB_PASSWORD || this.DEFAULT_DB_PASS;
        this.DB_NAME = process.env.DB_DATABASE || this.DEFAULT_DB_NAME;
        this.JWT_SECRET = process.env.JWT_SECRET || this.DEFAULT_JWT_SECRET;
        this.DB_SSL = process.env.DB_SSL ? process.env.DB_SSL === 'true' : this.DEFAULT_DB_SSL;
    }
}
