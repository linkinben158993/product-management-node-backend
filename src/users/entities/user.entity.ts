import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', unique: true, nullable: false })
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
