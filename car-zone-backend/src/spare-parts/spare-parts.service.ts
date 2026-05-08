import { Injectable, NotFoundException } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { SparePart, SparePartDocument } from './schemas/spare-part.schema';
import { CreateSparePartDto } from './dto/create-spare-part.dto';
import { UpdateSparePartDto } from './dto/update-spare-part.dto';
import { FilterSparePartsDto } from './dto/filter-spare-parts.dto';
import { PaginatedResult, PaginationUtil } from '../common';
import { SparePartsRepository } from './repositories/spare-parts.repository';

@Injectable()
export class SparePartsService {
  constructor(private readonly sparePartsRepository: SparePartsRepository) {}

  async create(
    createSparePartDto: CreateSparePartDto,
  ): Promise<SparePartDocument> {
    return this.sparePartsRepository.create(createSparePartDto);
  }

  async findAll(
    filterDto: FilterSparePartsDto,
  ): Promise<PaginatedResult<SparePartDocument>> {
    const { skip, limit, sort, page } =
      PaginationUtil.getPaginationOptions(filterDto);

    const filter = this.buildFilter(filterDto);

    const [data, total] = await Promise.all([
      this.sparePartsRepository.findWithPagination(filter, skip, limit, sort),
      this.sparePartsRepository.count(filter),
    ]);

    return PaginationUtil.paginate(data, total, page, limit);
  }

  private buildFilter(filterDto: FilterSparePartsDto): FilterQuery<SparePart> {
    const filter: FilterQuery<SparePart> = {};

    if (filterDto.category) {
      filter.category = filterDto.category;
    }

    if (filterDto.brand) {
      filter.brand = { $regex: filterDto.brand, $options: 'i' };
    }

    if (filterDto.condition) {
      filter.condition = filterDto.condition;
    }

    if (filterDto.inStock !== undefined) {
      filter.inStock = filterDto.inStock;
    }

    if (filterDto.search) {
      filter.$or = [
        { name: { $regex: filterDto.search, $options: 'i' } },
        { description: { $regex: filterDto.search, $options: 'i' } },
        { partNumber: { $regex: filterDto.search, $options: 'i' } },
      ];
    }

    if (filterDto.minPrice !== undefined || filterDto.maxPrice !== undefined) {
      filter.price = {};
      if (filterDto.minPrice !== undefined) {
        filter.price.$gte = filterDto.minPrice;
      }
      if (filterDto.maxPrice !== undefined) {
        filter.price.$lte = filterDto.maxPrice;
      }
    }

    if (filterDto.compatibility) {
      filter.compatibility = { $in: [filterDto.compatibility] };
    }

    return filter;
  }

  async findOne(id: string): Promise<SparePartDocument> {
    const sparePart = await this.sparePartsRepository.findById(id);
    if (!sparePart) {
      throw new NotFoundException(`Spare part with ID "${id}" not found`);
    }
    return sparePart;
  }

  async findByPartNumber(partNumber: string): Promise<SparePartDocument> {
    const sparePart =
      await this.sparePartsRepository.findByPartNumber(partNumber);
    if (!sparePart) {
      throw new NotFoundException(
        `Spare part with part number "${partNumber}" not found`,
      );
    }
    return sparePart;
  }

  async update(
    id: string,
    updateSparePartDto: UpdateSparePartDto,
  ): Promise<SparePartDocument> {
    const updatedSparePart = await this.sparePartsRepository.update(
      id,
      updateSparePartDto,
    );
    if (!updatedSparePart) {
      throw new NotFoundException(`Spare part with ID "${id}" not found`);
    }
    return updatedSparePart;
  }

  async remove(id: string): Promise<SparePartDocument> {
    const deletedSparePart = await this.sparePartsRepository.delete(id);
    if (!deletedSparePart) {
      throw new NotFoundException(`Spare part with ID "${id}" not found`);
    }
    return deletedSparePart;
  }

  async getCategories(): Promise<string[]> {
    return this.sparePartsRepository.distinct('category');
  }

  async getBrands(): Promise<string[]> {
    return this.sparePartsRepository.distinct('brand');
  }
}
