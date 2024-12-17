import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  productname: string;

  @Column({ length: 500 })
  catagory: string;

  

  @Column('int', { default: 0 }) // Provide a default value for `views`
  price: number;
  @Column('int', { default: 0 }) // Provide a default value for `views`
  rating: number;

  @Column({ default: false }) // Provide a default value for `isPublished`
  availability: boolean;
}
