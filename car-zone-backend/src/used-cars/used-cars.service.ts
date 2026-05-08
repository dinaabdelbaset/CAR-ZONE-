import { Injectable, NotFoundException } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { UsedCarsRepository } from './repositories/used-cars.repository';
import { UsedCarDocument } from './schemas/used-car.schema';
import { CreateUsedCarDto } from './dto/create-used-car.dto';
import { UpdateUsedCarDto } from './dto/update-used-car.dto';
import { FilterUsedCarsDto } from './dto/filter-used-cars.dto';
import { PaginatedResult, PaginationUtil } from '../common';
import { CarCondition, ServiceHistory } from './enums/used-car.enums';

@Injectable()
export class UsedCarsService {
  constructor(private readonly usedCarsRepository: UsedCarsRepository) {}

  async create(createUsedCarDto: CreateUsedCarDto): Promise<UsedCarDocument> {
    return this.usedCarsRepository.create(createUsedCarDto);
  }

  async findAll(
    filterDto: FilterUsedCarsDto,
  ): Promise<PaginatedResult<UsedCarDocument>> {
    const filter = this.buildFilter(filterDto);
    const { skip, limit, sort, page } =
      PaginationUtil.getPaginationOptions(filterDto);

    const [data, total] = await Promise.all([
      this.usedCarsRepository.findWithPagination(filter, skip, limit, sort),
      this.usedCarsRepository.count(filter),
    ]);

    return PaginationUtil.paginate(data, total, page, limit);
  }

  async findOne(id: string): Promise<UsedCarDocument> {
    const usedCar = await this.usedCarsRepository.findById(id);
    if (!usedCar) {
      throw new NotFoundException(`Used car with ID ${id} not found`);
    }
    return usedCar;
  }

  async update(
    id: string,
    updateUsedCarDto: UpdateUsedCarDto,
  ): Promise<UsedCarDocument> {
    const usedCar = await this.usedCarsRepository.update(id, updateUsedCarDto);
    if (!usedCar) {
      throw new NotFoundException(`Used car with ID ${id} not found`);
    }
    return usedCar;
  }

  async remove(id: string): Promise<UsedCarDocument> {
    const usedCar = await this.usedCarsRepository.delete(id);
    if (!usedCar) {
      throw new NotFoundException(`Used car with ID ${id} not found`);
    }
    return usedCar;
  }

  async getBrands(): Promise<string[]> {
    const x = await this.usedCarsRepository.distinct('brand');
    console.log('🚀 ~ UsedCarsService ~ getBrands ~ x:', x);
    return x;
  }

  async getConditions(): Promise<CarCondition[]> {
    return Object.values(CarCondition);
  }

  async getServiceHistoryOptions(): Promise<ServiceHistory[]> {
    return Object.values(ServiceHistory);
  }

  private buildFilter(
    filterDto: FilterUsedCarsDto,
  ): FilterQuery<UsedCarDocument> {
    const filter: FilterQuery<UsedCarDocument> = {};

    // Exact matches
    if (filterDto.brand) {
      filter.brand = { $regex: new RegExp(filterDto.brand, 'i') };
    }
    if (filterDto.model) {
      filter.model = { $regex: new RegExp(filterDto.model, 'i') };
    }
    if (filterDto.bodyType) {
      filter.bodyType = filterDto.bodyType;
    }
    if (filterDto.fuelType) {
      filter.fuelType = filterDto.fuelType;
    }
    if (filterDto.transmission) {
      filter.transmission = filterDto.transmission;
    }
    if (filterDto.condition) {
      filter.condition = filterDto.condition;
    }
    if (filterDto.serviceHistory) {
      filter.serviceHistory = filterDto.serviceHistory;
    }

    // Year range
    if (filterDto.minYear || filterDto.maxYear) {
      filter.year = {};
      if (filterDto.minYear) filter.year.$gte = filterDto.minYear;
      if (filterDto.maxYear) filter.year.$lte = filterDto.maxYear;
    }

    // Price range
    if (filterDto.minPrice !== undefined || filterDto.maxPrice !== undefined) {
      filter.price = {};
      if (filterDto.minPrice !== undefined)
        filter.price.$gte = filterDto.minPrice;
      if (filterDto.maxPrice !== undefined)
        filter.price.$lte = filterDto.maxPrice;
    }

    // Mileage range
    if (
      filterDto.minMileage !== undefined ||
      filterDto.maxMileage !== undefined
    ) {
      filter.mileage = {};
      if (filterDto.minMileage !== undefined)
        filter.mileage.$gte = filterDto.minMileage;
      if (filterDto.maxMileage !== undefined)
        filter.mileage.$lte = filterDto.maxMileage;
    }

    // Max previous owners
    if (filterDto.maxPreviousOwners !== undefined) {
      filter.previousOwners = { $lte: filterDto.maxPreviousOwners };
    }

    // Full-text search
    if (filterDto.search) {
      const searchRegex = new RegExp(filterDto.search, 'i');
      filter.$or = [
        { brand: searchRegex },
        { model: searchRegex },
        { description: searchRegex },
        { engine: searchRegex },
      ];
    }

    return filter;
  }
}
