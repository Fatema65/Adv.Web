import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, Length, IsNotEmpty } from 'class-validator';

@Entity()
export class registration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @Column('text', { default: '' })
  @Length(11,15,  { message: 'Phone number must be  11 characters' })
  phonenumber: string;

  @Column('text', { default: '' })
  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @Column('text', { default: '' })
  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @Column({ length: 100 })
  @Length(6, 100, { message: 'Password must be at least 6 characters long' })
  password: string;
}
