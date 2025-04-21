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
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { Request } from 'express';
import { MyJwtGuard } from '../../auth/guard/my.jwt.guard';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  @UseGuards(MyJwtGuard)
  async create(
    @Req() req: Request,
    @Body() createSupplierDto: CreateSupplierDto,
  ) {
    return await this.suppliersService.createOrUpdate(
      createSupplierDto,
      req.user,
    );
  }

  @Get()
  findAll() {
    return this.suppliersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suppliersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(MyJwtGuard)
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateSupplierDto: CreateSupplierDto,
  ) {
    const updated = Object.assign(updateSupplierDto, { id: id });
    return this.suppliersService.createOrUpdate(updated, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suppliersService.remove(id);
  }
}
