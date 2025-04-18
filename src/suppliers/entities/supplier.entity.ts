import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('suppliers')
export class Supplier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'numeric', precision: 18, scale: 2 })
  credit_limit: number;

  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  created_at: Date;
}
