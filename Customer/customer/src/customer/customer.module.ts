import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';





import { registration } from './Register.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


    @Module({
        imports: [
          TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'firfas524',
            database: 'customer',
            entities: [registration], // Add your Photo entity here
            synchronize: true,
          }),
          TypeOrmModule.forFeature([registration]), // Register Photo entity
        ],
    
    controllers: [ CustomerController],
  providers: [ CustomerService],})
export class CustomerModule {}
