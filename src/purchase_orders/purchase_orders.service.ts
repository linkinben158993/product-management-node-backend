import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePurchaseOrderDto } from './dto/create-purchase_order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase_order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseOrder } from './entities/purchase_order.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Supplier } from '../suppliers/entities/supplier.entity';

@Injectable()
export class PurchaseOrdersService {
  constructor(
    @InjectRepository(PurchaseOrder)
    private readonly purchaseOrderRepository: Repository<PurchaseOrder>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) {}

  private createPurchaseOrder = (
    user: User,
    supplier: Supplier,
  ): PurchaseOrder => {
    const purchaseOrder = new PurchaseOrder();
    purchaseOrder.status = 'draft';
    purchaseOrder.created_by = user;
    purchaseOrder.supplier_id = supplier;

    return purchaseOrder;
  };

  async create(user: any, supplierId: string, supplierEmail: string) {
    console.log(
      'Purchase Order User user=',
      user,
      'supplierId=',
      supplierId,
      'supplierEmail=',
      supplierEmail,
    );
    const createUser = await this.userRepository.findOne({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
      where: { id: user.id },
    });
    const supplier = await this.supplierRepository.findOne({
      where: { id: supplierId, email: supplierEmail },
    });

    if (!createUser || !supplier) {
      throw new NotFoundException();
    }

    return await this.purchaseOrderRepository.save(
      this.createPurchaseOrder(createUser, supplier),
    );
  }

  findAll() {
    return `This action returns all purchaseOrders`;
  }

  findOne(id: string) {
    return `This action returns a #${id} purchaseOrder`;
  }

  async findPendingReview() {
    return await this.purchaseOrderRepository.find({ where: { status: 'pending' } });
  }

  update(id: string, updatePurchaseOrderDto: UpdatePurchaseOrderDto) {
    return `This action updates a #${id} purchaseOrder`;
  }

  remove(id: string) {
    return `This action removes a #${id} purchaseOrder`;
  }
}
