import { Module } from '@nestjs/common';
import { PurchaseOrdersService } from './purchase_orders.service';
import { PurchaseOrdersController } from './purchase_orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrder } from './entities/purchase_order.entity';
import { User } from '../users/entities/user.entity';
import { Supplier } from '../suppliers/entities/supplier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseOrder, User, Supplier])],
  controllers: [PurchaseOrdersController],
  providers: [PurchaseOrdersService],
})
export class PurchaseOrdersModule {}
