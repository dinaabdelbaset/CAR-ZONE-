import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { MongooseModule } from '@nestjs/mongoose';
// We would import the models needed for statistics here later.
// For now, we will return some mock data or basic aggregation

@Module({
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
