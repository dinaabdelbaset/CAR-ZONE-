import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { BodyTypesService } from './body-types.service';
import { CreateBodyTypeDto } from './dto/create-body-type.dto';
import { UpdateBodyTypeDto } from './dto/update-body-type.dto';

@ApiTags('body-types')
@Controller('body-types')
export class BodyTypesController {
  constructor(private readonly bodyTypesService: BodyTypesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new body type' })
  @ApiResponse({ status: 201, description: 'Body type created successfully' })
  create(@Body() createBodyTypeDto: CreateBodyTypeDto) {
    return this.bodyTypesService.create(createBodyTypeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all body types' })
  @ApiResponse({ status: 200, description: 'Returns all body types' })
  findAll() {
    return this.bodyTypesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a body type by ID' })
  @ApiParam({ name: 'id', description: 'Body type ID' })
  @ApiResponse({ status: 200, description: 'Returns the body type' })
  @ApiResponse({ status: 404, description: 'Body type not found' })
  findOne(@Param('id') id: string) {
    return this.bodyTypesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a body type' })
  @ApiParam({ name: 'id', description: 'Body type ID' })
  @ApiResponse({ status: 200, description: 'Body type updated successfully' })
  @ApiResponse({ status: 404, description: 'Body type not found' })
  update(
    @Param('id') id: string,
    @Body() updateBodyTypeDto: UpdateBodyTypeDto,
  ) {
    return this.bodyTypesService.update(id, updateBodyTypeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a body type' })
  @ApiParam({ name: 'id', description: 'Body type ID' })
  @ApiResponse({ status: 200, description: 'Body type deleted successfully' })
  @ApiResponse({ status: 404, description: 'Body type not found' })
  remove(@Param('id') id: string) {
    return this.bodyTypesService.remove(id);
  }
}
