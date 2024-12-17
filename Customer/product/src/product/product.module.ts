import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Cart } from '../cart/cart.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'firfas524',
      database: 'customer',
      entities: [Product, Cart],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Product, Cart]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
