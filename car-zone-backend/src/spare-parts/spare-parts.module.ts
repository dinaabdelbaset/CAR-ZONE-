import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SparePartsService } from './spare-parts.service';
import { SparePartsController } from './spare-parts.controller';
import { SparePart, SparePartSchema } from './schemas/spare-part.schema';
import { SparePartsRepository } from './repositories/spare-parts.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SparePart.name, schema: SparePartSchema },
    ]),
  ],
  controllers: [SparePartsController],
  providers: [SparePartsService, SparePartsRepository],
  exports: [SparePartsService, SparePartsRepository],
})
export class SparePartsModule {}
