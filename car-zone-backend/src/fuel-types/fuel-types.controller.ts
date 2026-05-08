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
import { FuelTypesService } from './fuel-types.service';
import { CreateFuelTypeDto } from './dto/create-fuel-type.dto';
import { UpdateFuelTypeDto } from './dto/update-fuel-type.dto';

@ApiTags('fuel-types')
@Controller('fuel-types')
export class FuelTypesController {
  constructor(private readonly fuelTypesService: FuelTypesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new fuel type' })
  @ApiResponse({ status: 201, description: 'Fuel type created successfully' })
  create(@Body() createFuelTypeDto: CreateFuelTypeDto) {
    return this.fuelTypesService.create(createFuelTypeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all fuel types' })
  @ApiResponse({ status: 200, description: 'Returns all fuel types' })
  findAll() {
    return this.fuelTypesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a fuel type by ID' })
  @ApiParam({ name: 'id', description: 'Fuel type ID' })
  @ApiResponse({ status: 200, description: 'Returns the fuel type' })
  @ApiResponse({ status: 404, description: 'Fuel type not found' })
  findOne(@Param('id') id: string) {
    return this.fuelTypesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a fuel type' })
  @ApiParam({ name: 'id', description: 'Fuel type ID' })
  @ApiResponse({ status: 200, description: 'Fuel type updated successfully' })
  @ApiResponse({ status: 404, description: 'Fuel type not found' })
  update(
    @Param('id') id: string,
    @Body() updateFuelTypeDto: UpdateFuelTypeDto,
  ) {
    return this.fuelTypesService.update(id, updateFuelTypeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a fuel type' })
  @ApiParam({ name: 'id', description: 'Fuel type ID' })
  @ApiResponse({ status: 200, description: 'Fuel type deleted successfully' })
  @ApiResponse({ status: 404, description: 'Fuel type not found' })
  remove(@Param('id') id: string) {
    return this.fuelTypesService.remove(id);
  }
}
