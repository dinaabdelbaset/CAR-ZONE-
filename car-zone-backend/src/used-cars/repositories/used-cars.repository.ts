import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../common/repositories/base.repository';
import { UsedCar, UsedCarDocument } from '../schemas/used-car.schema';
import { CreateUsedCarDto } from '../dto/create-used-car.dto';
import { UpdateUsedCarDto } from '../dto/update-used-car.dto';

@Injectable()
export class UsedCarsRepository extends BaseRepository<
  UsedCarDocument,
  CreateUsedCarDto,
  UpdateUsedCarDto
> {
  constructor(
    @InjectModel(UsedCar.name)
    private readonly usedCarModel: Model<UsedCarDocument>,
  ) {
    super(usedCarModel);
  }
}
