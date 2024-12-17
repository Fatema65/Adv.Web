import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { registration } from './Register.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(registration)
    private readonly regiRepository: Repository<registration>,
  ) {}

  // Add customer
  async addcustomer(customerData: Partial<registration>) {
    const registration = this.regiRepository.create(customerData);
    return await this.regiRepository.save(registration);
  }

  // Get all customer details
  async getAlldetails() {
    return await this.regiRepository.find();
  }

  // Update customer profile
  async updateprofile(id: number, updatedData: Partial<registration>) {
    const registration = await this.regiRepository.findOne({ where: { id } });

    if (!registration) {
      throw new Error('Customer not found');
    }

    const updateprofile = this.regiRepository.merge(registration, updatedData);
    return await this.regiRepository.save(updateprofile);
  }

  // Validate user credentials for login
  async validateUser(name: string, password: string): Promise<registration | null> {
    const user = await this.regiRepository.findOne({ where: { name, password } });
    if (!user) {
      return null; // Return null if user not found or password doesn't match
    }
    return user; // Return user details if validation passes
  }
}
