import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeederService } from './seeder.service';
import { Brand, BrandSchema } from '../brands/schemas/brand.schema';
import {
  BodyType,
  BodyTypeSchema,
} from '../body-types/schemas/body-type.schema';
import {
  FuelType,
  FuelTypeSchema,
} from '../fuel-types/schemas/fuel-type.schema';
import {
  Transmission,
  TransmissionSchema,
} from '../transmissions/schemas/transmission.schema';
import { Car, CarSchema } from '../cars/schemas/car.schema';
import { UsedCar, UsedCarSchema } from 'src/used-cars/schemas/used-car.schema';
import {
  SparePart,
  SparePartSchema,
} from 'src/spare-parts/schemas/spare-part.schema';
import { User, UserSchema } from '../users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Brand.name, schema: BrandSchema },
      { name: BodyType.name, schema: BodyTypeSchema },
      { name: FuelType.name, schema: FuelTypeSchema },
      { name: Transmission.name, schema: TransmissionSchema },
      { name: Car.name, schema: CarSchema },
      { name: UsedCar.name, schema: UsedCarSchema },
      { name: SparePart.name, schema: SparePartSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
