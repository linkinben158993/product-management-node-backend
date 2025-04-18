import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PurchaseOrder } from '../../purchase_orders/entities/purchase_order.entity';

@Entity('suppliers')
export class Supplier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', nullable: true })
  email: string;

  @Column({ type: 'numeric', precision: 18, scale: 2, nullable: true })
  credit_limit: number;

  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  created_at: Date;

  @OneToMany(() => PurchaseOrder, (purchaseOrder) => purchaseOrder.supplier_id)
  purchase_orders: PurchaseOrder[];
}
