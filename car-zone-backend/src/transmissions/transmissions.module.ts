import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransmissionsService } from './transmissions.service';
import { TransmissionsController } from './transmissions.controller';
import {
  Transmission,
  TransmissionSchema,
} from './schemas/transmission.schema';
import { TransmissionsRepository } from './repositories/transmissions.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transmission.name, schema: TransmissionSchema },
    ]),
  ],
  controllers: [TransmissionsController],
  providers: [TransmissionsService, TransmissionsRepository],
  exports: [TransmissionsService, TransmissionsRepository],
})
export class TransmissionsModule {}
