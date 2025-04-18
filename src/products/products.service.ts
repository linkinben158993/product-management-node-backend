import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createOrUpdate(createProductDto: CreateProductDto) {
    const supplier = await this.productRepository.upsert(createProductDto, [
      'id',
      'sku',
    ]);
    console.log('Newly created or update supplier information:', supplier);
    return supplier;
  }

  async findAll() {
    const products = await this.productRepository.find();
    console.log('Found products', products);
    return products;
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({ where: { id } });
    console.log('Found product', product);
    return product;
  }

  async remove(id: string) {
    const foundProduct = await this.findOne(id);
    if (!foundProduct) {
      throw new NotFoundException();
    }

    console.log('Removing supplier with id', id);

    return await this.productRepository.remove(foundProduct);
  }
}
