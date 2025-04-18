import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text', select: false })
  password_hash: string;

  @Column({
    type: 'enum',
    enum: ['procurement', 'manager', 'inventory', 'finance'],
  })
  role: string;

  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  created_at: Date;

  @BeforeInsert()
  async setPasswordHash(password: string) {
    const salt = await bcrypt.genSalt(10);
    this.password_hash = await bcrypt.hash(
      password || this.password_hash,
      salt,
    );
  }

  // Todo: Dev purposes only to be remove
  @BeforeInsert()
  setRole() {
    const procurement_user = ['thienan.nguyenhoang311@gmail.com'];
    const manager_user = ['thienan.nguyenhoang411@gmail.com'];
    const inventory_user = ['thienan.nguyenhoang511@gmail.com'];
    const finance_user = ['thienan.nguyenhoang611@gmail.com'];

    if (procurement_user.includes(this.email)) {
      this.role = 'procurement';
    }
    if (manager_user.includes(this.email)) {
      this.role = 'manager';
    }
    if (inventory_user.includes(this.email)) {
      this.role = 'inventory';
    }
    if (finance_user.includes(this.email)) {
      this.role = 'finance';
    }
  }
}
