import { Injectable, NotFoundException } from '@nestjs/common';
import { TransmissionDocument } from './schemas/transmission.schema';
import { CreateTransmissionDto } from './dto/create-transmission.dto';
import { UpdateTransmissionDto } from './dto/update-transmission.dto';
import { TransmissionsRepository } from './repositories/transmissions.repository';

@Injectable()
export class TransmissionsService {
  constructor(
    private readonly transmissionsRepository: TransmissionsRepository,
  ) {}

  async create(
    createTransmissionDto: CreateTransmissionDto,
  ): Promise<TransmissionDocument> {
    return this.transmissionsRepository.create(createTransmissionDto);
  }

  async findAll(): Promise<TransmissionDocument[]> {
    return this.transmissionsRepository.findAll();
  }

  async findOne(id: string): Promise<TransmissionDocument> {
    const transmission = await this.transmissionsRepository.findById(id);
    if (!transmission) {
      throw new NotFoundException(`Transmission with ID "${id}" not found`);
    }
    return transmission;
  }

  async update(
    id: string,
    updateTransmissionDto: UpdateTransmissionDto,
  ): Promise<TransmissionDocument> {
    const updatedTransmission = await this.transmissionsRepository.update(
      id,
      updateTransmissionDto,
    );
    if (!updatedTransmission) {
      throw new NotFoundException(`Transmission with ID "${id}" not found`);
    }
    return updatedTransmission;
  }

  async remove(id: string): Promise<TransmissionDocument> {
    const deletedTransmission = await this.transmissionsRepository.delete(id);
    if (!deletedTransmission) {
      throw new NotFoundException(`Transmission with ID "${id}" not found`);
    }
    return deletedTransmission;
  }
}
