import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from './entities/supplier.entity';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) {}

  private createPurchaseOrder = (user: any): Supplier => {
    const supplier = new Supplier();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
    supplier.email = user.email;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
    supplier.name = user.name;

    return supplier;
  };

  async createOrUpdate(createSupplierDto: CreateSupplierDto, user: any) {
    console.log(
      'Suppliers User user=',
      user,
      'supplierDto=',
      createSupplierDto,
    );
    const supplier = await this.supplierRepository.upsert(
      this.createPurchaseOrder(user),
      ['id'],
    );
    console.log('Newly created or update supplier information:', supplier);
    return supplier;
  }

  async findAll() {
    const suppliers = await this.supplierRepository.find();
    console.log('Found suppliers', suppliers);
    return suppliers;
  }

  async findOne(id: string) {
    const supplier = await this.supplierRepository.findOne({ where: { id } });
    console.log('Found supplier', supplier);
    return supplier;
  }

  async remove(id: string) {
    const foundSupplier = await this.findOne(id);
    if (!foundSupplier) {
      throw new NotFoundException();
    }

    console.log('Removing supplier with id', id);

    return await this.supplierRepository.remove(foundSupplier);
  }
}
