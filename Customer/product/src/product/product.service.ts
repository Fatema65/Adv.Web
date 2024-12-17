import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {

  constructor(
      @InjectRepository(Product)
      private readonly productRepository: Repository<Product>,
    ) {}
    // Add customer
      async addproduct(productData: Partial<Product>) {
        const Product = this.productRepository.create(productData);
        return await this.productRepository.save(Product);
      }
    
      // Get all customer details
      async getAlldetails() {
        return await this.productRepository.find();
      }

      async searchAndFilter(filter: {
        name?: string;
        category?: string;
        minPrice?: number;
        maxPrice?: number;
    }) {
        const query = this.productRepository.createQueryBuilder('product');

        if (filter.name) {
            query.andWhere('product.productname LIKE :name', { name: `%${filter.name}%` });
        }

        if (filter.category) {
            query.andWhere('product.catagory LIKE :category', { category: `%${filter.category}%` });
        }

        if (filter.minPrice) {
            query.andWhere('product.price >= :minPrice', { minPrice: filter.minPrice });
        }

        if (filter.maxPrice) {
            query.andWhere('product.price <= :maxPrice', { maxPrice: filter.maxPrice });
        }

        return await query.getMany();
    }
}

    
    
