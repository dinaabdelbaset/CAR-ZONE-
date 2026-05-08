import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../common';
import { SparePart, SparePartDocument } from '../schemas/spare-part.schema';
import { CreateSparePartDto } from '../dto/create-spare-part.dto';
import { UpdateSparePartDto } from '../dto/update-spare-part.dto';

@Injectable()
export class SparePartsRepository extends BaseRepository<
  SparePartDocument,
  CreateSparePartDto,
  UpdateSparePartDto
> {
  constructor(
    @InjectModel(SparePart.name) sparePartModel: Model<SparePartDocument>,
  ) {
    super(sparePartModel);
  }

  async findByPartNumber(
    partNumber: string,
  ): Promise<SparePartDocument | null> {
    return this.entityModel.findOne({ partNumber }).exec();
  }

  async findByCategory(category: string): Promise<SparePartDocument[]> {
    return this.entityModel.find({ category }).exec();
  }

  async findInStock(): Promise<SparePartDocument[]> {
    return this.entityModel.find({ inStock: true }).exec();
  }

  async findByCompatibility(carModel: string): Promise<SparePartDocument[]> {
    return this.entityModel.find({ compatibility: { $in: [carModel] } }).exec();
  }
}
