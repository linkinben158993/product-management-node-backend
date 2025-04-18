import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text' })
  password_hash: string;

  @Column({
    type: 'enum',
    enum: ['procurement', 'manager', 'inventory', 'finance'],
  })
  role: string;

  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  created_at: Date;
}
