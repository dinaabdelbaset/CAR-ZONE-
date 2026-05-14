import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MaintenanceController } from './maintenance.controller';
import { MaintenanceService } from './maintenance.service';
import { UserCar, UserCarSchema } from './schemas/user-car.schema';
import { MaintenanceRequest, MaintenanceRequestSchema } from './schemas/maintenance-request.schema';
import { MaintenanceRecord, MaintenanceRecordSchema } from './schemas/maintenance-record.schema';

import { EmailService } from '../common/email.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserCar.name, schema: UserCarSchema },
      { name: MaintenanceRequest.name, schema: MaintenanceRequestSchema },
      { name: MaintenanceRecord.name, schema: MaintenanceRecordSchema },
    ]),
  ],
  controllers: [MaintenanceController],
  providers: [MaintenanceService, EmailService],
  exports: [MaintenanceService],
})
export class MaintenanceModule {}
