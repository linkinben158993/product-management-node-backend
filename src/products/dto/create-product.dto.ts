export class CreateProductDto {
  id?: string;
  name: string;
  sku: string;
  category?: string;
  unit_price?: number;
  stock?: number;
  pending_stock?: number;
}
