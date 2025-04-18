import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', unique: true })
  sku: string;

  @Column({ type: 'text', nullable: true })
  category: string;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  unit_price: number;

  @Column({ type: 'bigint', default: 0 })
  stock: number;

  @Column({ type: 'bigint', default: 0 })
  pending_stock: number;

  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  created_at: Date;
}
