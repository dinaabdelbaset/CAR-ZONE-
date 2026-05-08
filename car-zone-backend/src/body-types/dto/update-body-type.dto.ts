import { PartialType } from '@nestjs/mapped-types';
import { CreateBodyTypeDto } from './create-body-type.dto';

export class UpdateBodyTypeDto extends PartialType(CreateBodyTypeDto) {}
