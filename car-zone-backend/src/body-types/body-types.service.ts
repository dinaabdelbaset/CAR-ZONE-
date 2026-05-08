import { Injectable, NotFoundException } from '@nestjs/common';
import { BodyTypeDocument } from './schemas/body-type.schema';
import { CreateBodyTypeDto } from './dto/create-body-type.dto';
import { UpdateBodyTypeDto } from './dto/update-body-type.dto';
import { BodyTypesRepository } from './repositories/body-types.repository';

@Injectable()
export class BodyTypesService {
  constructor(private readonly bodyTypesRepository: BodyTypesRepository) {}

  async create(
    createBodyTypeDto: CreateBodyTypeDto,
  ): Promise<BodyTypeDocument> {
    return this.bodyTypesRepository.create(createBodyTypeDto);
  }

  async findAll(): Promise<BodyTypeDocument[]> {
    return this.bodyTypesRepository.findAll({}, { name: 1 });
  }

  async findOne(id: string): Promise<BodyTypeDocument> {
    const bodyType = await this.bodyTypesRepository.findById(id);
    if (!bodyType) {
      throw new NotFoundException(`BodyType with ID "${id}" not found`);
    }
    return bodyType;
  }

  async update(
    id: string,
    updateBodyTypeDto: UpdateBodyTypeDto,
  ): Promise<BodyTypeDocument> {
    const updatedBodyType = await this.bodyTypesRepository.update(
      id,
      updateBodyTypeDto,
    );
    if (!updatedBodyType) {
      throw new NotFoundException(`BodyType with ID "${id}" not found`);
    }
    return updatedBodyType;
  }

  async remove(id: string): Promise<BodyTypeDocument> {
    const deletedBodyType = await this.bodyTypesRepository.delete(id);
    if (!deletedBodyType) {
      throw new NotFoundException(`BodyType with ID "${id}" not found`);
    }
    return deletedBodyType;
  }
}
