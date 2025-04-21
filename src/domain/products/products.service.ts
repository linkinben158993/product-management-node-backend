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

  private buildCreateProduct = (
    createProductDto: CreateProductDto,
  ): Product => {
    const product = new Product();
    product.name = createProductDto.name;
    product.sku = createProductDto.sku;
    product.category = createProductDto.category || '';
    product.unit_price = createProductDto.unit_price;

    return product;
  };

  async createOrUpdate(createProductDto: CreateProductDto) {
    console.log('Upsert a product with info=', createProductDto);
    const product = await this.productRepository.upsert(
      this.buildCreateProduct(createProductDto),
      {
        conflictPaths: ['sku'],
      },
    );
    console.log('Newly created or update supplier information:', product);
    return product;
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
