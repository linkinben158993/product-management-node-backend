import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
