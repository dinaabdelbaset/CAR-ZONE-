import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BodyTypesService } from './body-types.service';
import { BodyTypesController } from './body-types.controller';
import { BodyType, BodyTypeSchema } from './schemas/body-type.schema';
import { BodyTypesRepository } from './repositories/body-types.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BodyType.name, schema: BodyTypeSchema },
    ]),
  ],
  controllers: [BodyTypesController],
  providers: [BodyTypesService, BodyTypesRepository],
  exports: [BodyTypesService, BodyTypesRepository],
})
export class BodyTypesModule {}
