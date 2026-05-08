import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../common';
import { BodyType, BodyTypeDocument } from '../schemas/body-type.schema';
import { CreateBodyTypeDto } from '../dto/create-body-type.dto';
import { UpdateBodyTypeDto } from '../dto/update-body-type.dto';

@Injectable()
export class BodyTypesRepository extends BaseRepository<
  BodyTypeDocument,
  CreateBodyTypeDto,
  UpdateBodyTypeDto
> {
  constructor(
    @InjectModel(BodyType.name) bodyTypeModel: Model<BodyTypeDocument>,
  ) {
    super(bodyTypeModel);
  }

  async findByName(name: string): Promise<BodyTypeDocument | null> {
    return this.entityModel.findOne({ name }).exec();
  }
}
