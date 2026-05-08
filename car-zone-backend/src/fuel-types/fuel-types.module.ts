import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FuelTypesService } from './fuel-types.service';
import { FuelTypesController } from './fuel-types.controller';
import { FuelType, FuelTypeSchema } from './schemas/fuel-type.schema';
import { FuelTypesRepository } from './repositories/fuel-types.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FuelType.name, schema: FuelTypeSchema },
    ]),
  ],
  controllers: [FuelTypesController],
  providers: [FuelTypesService, FuelTypesRepository],
  exports: [FuelTypesService, FuelTypesRepository],
})
export class FuelTypesModule {}
