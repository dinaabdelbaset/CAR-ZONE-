import { PartialType } from '@nestjs/swagger';
import { CreateUsedCarDto } from './create-used-car.dto';

export class UpdateUsedCarDto extends PartialType(CreateUsedCarDto) {}
