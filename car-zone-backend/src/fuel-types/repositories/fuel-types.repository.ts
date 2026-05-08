import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../common';
import { FuelType, FuelTypeDocument } from '../schemas/fuel-type.schema';
import { CreateFuelTypeDto } from '../dto/create-fuel-type.dto';
import { UpdateFuelTypeDto } from '../dto/update-fuel-type.dto';

@Injectable()
export class FuelTypesRepository extends BaseRepository<
  FuelTypeDocument,
  CreateFuelTypeDto,
  UpdateFuelTypeDto
> {
  constructor(
    @InjectModel(FuelType.name) fuelTypeModel: Model<FuelTypeDocument>,
  ) {
    super(fuelTypeModel);
  }

  async findByName(name: string): Promise<FuelTypeDocument | null> {
    return this.entityModel.findOne({ name }).exec();
  }
}
