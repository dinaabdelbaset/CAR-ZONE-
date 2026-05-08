import { Injectable, NotFoundException } from '@nestjs/common';
import { BrandDocument } from './schemas/brand.schema';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandsRepository } from './repositories/brands.repository';

@Injectable()
export class BrandsService {
  constructor(private readonly brandsRepository: BrandsRepository) {}

  async create(createBrandDto: CreateBrandDto): Promise<BrandDocument> {
    return this.brandsRepository.create(createBrandDto);
  }

  async findAll(): Promise<BrandDocument[]> {
    return this.brandsRepository.findAll(
      {},
      { name: 1, description: 1, logo: 1, country: 1 },
    );
  }

  async findOne(id: string): Promise<BrandDocument> {
    const brand = await this.brandsRepository.findById(id);
    if (!brand) {
      throw new NotFoundException(`Brand with ID "${id}" not found`);
    }
    return brand;
  }

  async update(
    id: string,
    updateBrandDto: UpdateBrandDto,
  ): Promise<BrandDocument> {
    const updatedBrand = await this.brandsRepository.update(id, updateBrandDto);
    if (!updatedBrand) {
      throw new NotFoundException(`Brand with ID "${id}" not found`);
    }
    return updatedBrand;
  }

  async remove(id: string): Promise<BrandDocument> {
    const deletedBrand = await this.brandsRepository.delete(id);
    if (!deletedBrand) {
      throw new NotFoundException(`Brand with ID "${id}" not found`);
    }
    return deletedBrand;
  }
}
