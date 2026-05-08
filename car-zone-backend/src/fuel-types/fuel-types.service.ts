import { Injectable, NotFoundException } from '@nestjs/common';
import { FuelTypeDocument } from './schemas/fuel-type.schema';
import { CreateFuelTypeDto } from './dto/create-fuel-type.dto';
import { UpdateFuelTypeDto } from './dto/update-fuel-type.dto';
import { FuelTypesRepository } from './repositories/fuel-types.repository';

@Injectable()
export class FuelTypesService {
  constructor(private readonly fuelTypesRepository: FuelTypesRepository) {}

  async create(
    createFuelTypeDto: CreateFuelTypeDto,
  ): Promise<FuelTypeDocument> {
    return this.fuelTypesRepository.create(createFuelTypeDto);
  }

  async findAll(): Promise<FuelTypeDocument[]> {
    return this.fuelTypesRepository.findAll();
  }

  async findOne(id: string): Promise<FuelTypeDocument> {
    const fuelType = await this.fuelTypesRepository.findById(id);
    if (!fuelType) {
      throw new NotFoundException(`FuelType with ID "${id}" not found`);
    }
    return fuelType;
  }

  async update(
    id: string,
    updateFuelTypeDto: UpdateFuelTypeDto,
  ): Promise<FuelTypeDocument> {
    const updatedFuelType = await this.fuelTypesRepository.update(
      id,
      updateFuelTypeDto,
    );
    if (!updatedFuelType) {
      throw new NotFoundException(`FuelType with ID "${id}" not found`);
    }
    return updatedFuelType;
  }

  async remove(id: string): Promise<FuelTypeDocument> {
    const deletedFuelType = await this.fuelTypesRepository.delete(id);
    if (!deletedFuelType) {
      throw new NotFoundException(`FuelType with ID "${id}" not found`);
    }
    return deletedFuelType;
  }
}
