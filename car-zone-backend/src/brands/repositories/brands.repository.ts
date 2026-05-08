import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../common';
import { Brand, BrandDocument } from '../schemas/brand.schema';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';

@Injectable()
export class BrandsRepository extends BaseRepository<
  BrandDocument,
  CreateBrandDto,
  UpdateBrandDto
> {
  constructor(@InjectModel(Brand.name) brandModel: Model<BrandDocument>) {
    super(brandModel);
  }

  async findByName(name: string): Promise<BrandDocument | null> {
    return this.entityModel.findOne({ name }).exec();
  }
}
