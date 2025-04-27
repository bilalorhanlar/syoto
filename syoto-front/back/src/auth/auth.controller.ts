import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { log } from 'console';
import { AuthEntity } from './auth.entity';
import { AuthDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly databaseService : AuthService ) {}
  
  @Get()
  getAll() {
    log("asd");
    return this.databaseService.findAll();
  }

  @Post()
  setOne(@Body() Auth : AuthDto )
  {
    return this.databaseService.addOne(Auth );
  }

  @Post("control")
  setController(@Body() Auth : AuthDto )
  {

    const a =  this.databaseService.findUserPass(Auth);
    return a;
  }


}
