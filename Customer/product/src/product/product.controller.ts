import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}
    
      @Post('/add')
        async addproduct(@Body() data: Product) {
          return await this.productService.addproduct(data);
        }
      
        @Get('/all')
        async getAlldetails() {
          return await this.productService.getAlldetails();
        }

        @Get('/search')
    async searchAndFilter(
        @Query('name') name?: string,
        @Query('category') category?: string,
        @Query('minPrice') minPrice?: number,
        @Query('maxPrice') maxPrice?: number,
    ) {
        return await this.productService.searchAndFilter({ name, category, minPrice, maxPrice });
    }
}
