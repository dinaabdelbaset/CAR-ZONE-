import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsedCarsController } from './used-cars.controller';
import { UsedCarsService } from './used-cars.service';
import { UsedCarsRepository } from './repositories/used-cars.repository';
import { UsedCar, UsedCarSchema } from './schemas/used-car.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UsedCar.name, schema: UsedCarSchema }]),
  ],
  controllers: [UsedCarsController],
  providers: [UsedCarsService, UsedCarsRepository],
  exports: [UsedCarsService, UsedCarsRepository],
})
export class UsedCarsModule {}
