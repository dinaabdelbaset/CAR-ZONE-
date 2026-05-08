import { Injectable, NotFoundException } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { CarDocument } from './schemas/car.schema';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { FilterCarsDto } from './dto/filter-cars.dto';
import { PaginatedResult, PaginationUtil } from '../common';
import { CarsRepository } from './repositories/cars.repository';

@Injectable()
export class CarsService {
  constructor(private readonly carsRepository: CarsRepository) {}

  async create(createCarDto: CreateCarDto): Promise<CarDocument> {
    return this.carsRepository.create(createCarDto);
  }

  async findAll(
    filterDto: FilterCarsDto,
  ): Promise<PaginatedResult<CarDocument>> {
    const { skip, limit, sort, page } =
      PaginationUtil.getPaginationOptions(filterDto);

    const filter = this.buildFilter(filterDto);
    console.log('🚀 ~ CarsService ~ findAll ~ filter:', filter);

    const [data, total] = await Promise.all([
      this.carsRepository.findAllWithPopulate(filter, skip, limit, sort),
      this.carsRepository.count(filter),
    ]);

    return PaginationUtil.paginate(data, total, page, limit);
  }

  private buildFilter(filterDto: FilterCarsDto): FilterQuery<CarDocument> {
    const filter: FilterQuery<CarDocument> = {};

    if (filterDto.brand) {
      filter.brand = filterDto.brand;
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

    if (filterDto.search) {
      filter.$or = [
        { model: { $regex: filterDto.search, $options: 'i' } },
        { description: { $regex: filterDto.search, $options: 'i' } },
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

    if (filterDto.minYear !== undefined || filterDto.maxYear !== undefined) {
      filter.year = {};
      if (filterDto.minYear !== undefined) {
        filter.year.$gte = filterDto.minYear;
      }
      if (filterDto.maxYear !== undefined) {
        filter.year.$lte = filterDto.maxYear;
      }
    }

    if (filterDto.isFeatured !== undefined) {
      filter.isFeatured = filterDto.isFeatured;
    }

    return filter;
  }

  async findOne(id: string): Promise<CarDocument> {
    const car = await this.carsRepository.findByIdWithPopulate(id);
    if (!car) {
      throw new NotFoundException(`Car with ID "${id}" not found`);
    }
    return car;
  }

  async update(id: string, updateCarDto: UpdateCarDto): Promise<CarDocument> {
    const updatedCar = await this.carsRepository.updateWithPopulate(
      id,
      updateCarDto,
    );
    if (!updatedCar) {
      throw new NotFoundException(`Car with ID "${id}" not found`);
    }
    return updatedCar;
  }

  async remove(id: string): Promise<CarDocument> {
    const deletedCar = await this.carsRepository.delete(id);
    if (!deletedCar) {
      throw new NotFoundException(`Car with ID "${id}" not found`);
    }
    return deletedCar;
  }
}
