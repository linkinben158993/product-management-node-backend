import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { PurchaseOrderGuard } from '../../auth/guard/purchase-order.guard';
import { MyJwtGuard } from '../../auth/guard/my.jwt.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(MyJwtGuard, PurchaseOrderGuard)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createOrUpdate(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: CreateProductDto) {
    const updated = Object.assign(updateProductDto, { id: id });
    return this.productsService.createOrUpdate(updated);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
