import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PurchaseOrdersService } from './purchase_orders.service';
import { CreatePurchaseOrderDto } from './dto/create-purchase_order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase_order.dto';
import { MyJwtGuard } from '../auth/guard/my.jwt.guard';
import { PurchaseOrderGuard } from '../auth/guard/purchase-order.guard';
import { Request } from 'express';

@Controller('purchase-orders')
@UseGuards(MyJwtGuard)
export class PurchaseOrdersController {
  constructor(private readonly purchaseOrdersService: PurchaseOrdersService) {}

  @Post()
  @UseGuards(PurchaseOrderGuard)
  async create(@Req() req: Request, @Body() createPurchaseOrderDto: CreatePurchaseOrderDto) {
    const { supplierId, supplierEmail } = createPurchaseOrderDto;
    return await this.purchaseOrdersService.createOrUpdateWithSupplier(
      req.user,
      supplierId,
      supplierEmail,
    );
  }

  @Get()
  findAll() {
    return this.purchaseOrdersService.findAll();
  }

  @Get('/review')
  async findPendingReviewPurchaseOrder() {
    return await this.purchaseOrdersService.findPendingReview();
  }

  @Patch('/review/request/:id')
  @UseGuards(PurchaseOrderGuard)
  async requestReviewPurchaseOrder(
    @Param('id') id: string,
    @Body() updatePurchaseOrderDto: UpdatePurchaseOrderDto,
  ) {
    return await this.purchaseOrdersService.requestReview(
      id,
      updatePurchaseOrderDto,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseOrdersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(PurchaseOrderGuard)
  update(
    @Req() req: Request,
    @Param('id') purchaseOrderId: string,
    @Body() updatePurchaseOrderDto: UpdatePurchaseOrderDto,
  ) {
    console.log(
      'Purchase Order Controller user=',
      req.user,
      'id=',
      purchaseOrderId,
    );
    return this.purchaseOrdersService.update(
      purchaseOrderId,
      updatePurchaseOrderDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseOrdersService.remove(id);
  }
}
