import { Body, Controller, Get, Param, Patch, Post, UnauthorizedException } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { registration } from './Register.entity';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('/add')
  async addcustomer(@Body() data: registration) {
    return await this.customerService.addcustomer(data);
  }

  @Get('/all')
  async getAlldetails() {
    return await this.customerService.getAlldetails();
  }

  @Patch('/update/:id')
  async updatePhoto(@Param('id') id: number, @Body() updatedData: Partial<registration>) {
    return await this.customerService.updateprofile(id, updatedData);
  }

  // Login endpoint
  @Post('/login')
  async login(@Body() credentials: { name: string; password: string }) {
    const user = await this.customerService.validateUser(credentials.name, credentials.password);
    if (!user) {
      throw new UnauthorizedException('Invalid name or password');
    }
    return { message: 'Login successful', user };
  }
}
