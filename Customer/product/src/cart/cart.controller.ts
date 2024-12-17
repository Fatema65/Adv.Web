// cart.controller.ts
import { Controller, Post, Get, Body, Delete, Param, Patch } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './creat_cart.dto';


@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/add')
  async addToCart(@Body() cartData: AddToCartDto) {
    return await this.cartService.addToCart(cartData);
  }

  @Get('/items')
  async getCartItems() {
    return await this.cartService.getCartItems();
  }

  /*@Delete('/remove/:id')
  async removeFromCart(@Param('id') id: number) {
    return await this.cartService.removeFromCart(id);
  }*/

  @Delete('/remove/:id')
async removeFromCart(@Param('id') id: number) {
  await this.cartService.removeFromCart(id);
  return {
    message: 'Cart item successfully removed',
  };
}


// Update cart item quantity
@Patch('/update/:id')
async updateCart(@Param('id') id: number, @Body('quantity') quantity: number) {
   await this.cartService.updateCart(id, quantity);
   return{message: 'update successfully ',};
}
}
