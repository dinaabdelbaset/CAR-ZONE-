import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../common';
import {
  Transmission,
  TransmissionDocument,
} from '../schemas/transmission.schema';
import { CreateTransmissionDto } from '../dto/create-transmission.dto';
import { UpdateTransmissionDto } from '../dto/update-transmission.dto';

@Injectable()
export class TransmissionsRepository extends BaseRepository<
  TransmissionDocument,
  CreateTransmissionDto,
  UpdateTransmissionDto
> {
  constructor(
    @InjectModel(Transmission.name)
    transmissionModel: Model<TransmissionDocument>,
  ) {
    super(transmissionModel);
  }

  async findByName(name: string): Promise<TransmissionDocument | null> {
    return this.entityModel.findOne({ name }).exec();
  }
}
