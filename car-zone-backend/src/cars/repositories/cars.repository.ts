import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { BaseRepository } from '../../common';
import { Car, CarDocument } from '../schemas/car.schema';
import { CreateCarDto } from '../dto/create-car.dto';
import { UpdateCarDto } from '../dto/update-car.dto';

@Injectable()
export class CarsRepository extends BaseRepository<
  CarDocument,
  CreateCarDto,
  UpdateCarDto
> {
  constructor(@InjectModel(Car.name) carModel: Model<CarDocument>) {
    super(carModel);
  }

  async findByIdWithPopulate(id: string): Promise<CarDocument> {
    return this.entityModel
      .findById(id)
      .populate('brand',{name:1})
      .populate('bodyType',{name:1})
      .populate('fuelType',{name:1})
      .populate('transmission',{name:1})
      .exec();
  }

  async findAllWithPopulate(
    filter: FilterQuery<CarDocument>,
    skip: number,
    limit: number,
    sort: Record<string, 1 | -1>,
  ): Promise<CarDocument[]> {
    return this.entityModel
      .find(filter)
      .populate('brand', { name: 1 })
      .populate('bodyType', { name: 1 })
      .populate('fuelType', { name: 1 })
      .populate('transmission', { name: 1 })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async updateWithPopulate(
    id: string,
    data: UpdateCarDto,
  ): Promise<CarDocument | null> {
    return this.entityModel
      .findByIdAndUpdate(id, data, { new: true })
      .populate('brand', { name: 1 })
      .populate('bodyType', { name: 1 })
      .populate('fuelType', { name: 1 })
      .populate('transmission', { name: 1 })
      .exec();
  }
}
