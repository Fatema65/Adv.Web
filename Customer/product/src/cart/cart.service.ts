// cart.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';


import { Product } from 'src/product/product.entity';
import { AddToCartDto } from './creat_cart.dto';


@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async addToCart(cartData: AddToCartDto) {
    const product = await this.productRepository.findOne({ where: { id: cartData.productId } });
    if (!product) {
      throw new Error('Product not found');
    }

    const cartItem = this.cartRepository.create({
      product,
      quantity: cartData.quantity,
    });

    return await this.cartRepository.save(cartItem);
  }

  async getCartItems() {
    return await this.cartRepository.find();
  }

  // Remove item from the cart
  async removeFromCart(cartId: number) {
    const cartItem = await this.cartRepository.findOne({ where: { id: cartId } });
    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }
    return await this.cartRepository.remove(cartItem);
  }

  // Update quantity of an item in the cart
  async updateCart(cartId: number, newQuantity: number) {
    const cartItem = await this.cartRepository.findOne({ where: { id: cartId } });
    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }
    cartItem.quantity = newQuantity;
    return await this.cartRepository.save(cartItem);
  }

}
