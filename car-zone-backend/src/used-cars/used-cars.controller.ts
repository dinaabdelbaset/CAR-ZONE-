import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { UsedCarsService } from './used-cars.service';
import { CreateUsedCarDto } from './dto/create-used-car.dto';
import { UpdateUsedCarDto } from './dto/update-used-car.dto';
import { FilterUsedCarsDto } from './dto/filter-used-cars.dto';
import { UsedCar } from './schemas/used-car.schema';
import { CarCondition, ServiceHistory } from './enums/used-car.enums';

@ApiTags('used-cars')
@Controller('used-cars')
export class UsedCarsController {
  constructor(private readonly usedCarsService: UsedCarsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new used car listing' })
  @ApiBody({ type: CreateUsedCarDto })
  @ApiResponse({
    status: 201,
    description: 'Used car listing created successfully',
    type: UsedCar,
  })
  @ApiResponse({ status: 400, description: 'Bad request - validation error' })
  create(@Body() createUsedCarDto: CreateUsedCarDto) {
    return this.usedCarsService.create(createUsedCarDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all used cars with pagination and filters' })
  @ApiResponse({
    status: 200,
    description: 'List of used cars retrieved successfully',
  })
  findAll(@Query() filterDto: FilterUsedCarsDto) {
    console.log('🚀 ~ UsedCarsController ~ findAll ~ filterDto:', filterDto);
    return this.usedCarsService.findAll(filterDto);
  }

  @Get('brands')
  @ApiOperation({ summary: 'Get all unique used car brands' })
  @ApiResponse({
    status: 200,
    description: 'List of unique brands',
    type: [String],
  })
  getBrands() {
    return this.usedCarsService.getBrands();
  }

  @Get('conditions')
  @ApiOperation({ summary: 'Get all car condition options' })
  @ApiResponse({
    status: 200,
    description: 'List of condition options',
    type: [String],
  })
  getConditions(): CarCondition[] {
    return Object.values(CarCondition);
  }

  @Get('service-history-options')
  @ApiOperation({ summary: 'Get all service history options' })
  @ApiResponse({
    status: 200,
    description: 'List of service history options',
    type: [String],
  })
  getServiceHistoryOptions(): ServiceHistory[] {
    return Object.values(ServiceHistory);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a used car by ID' })
  @ApiParam({ name: 'id', description: 'Used car ID' })
  @ApiResponse({
    status: 200,
    description: 'Used car found',
    type: UsedCar,
  })
  @ApiResponse({ status: 404, description: 'Used car not found' })
  findOne(@Param('id') id: string) {
    return this.usedCarsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a used car listing' })
  @ApiParam({ name: 'id', description: 'Used car ID' })
  @ApiBody({ type: UpdateUsedCarDto })
  @ApiResponse({
    status: 200,
    description: 'Used car updated successfully',
    type: UsedCar,
  })
  @ApiResponse({ status: 404, description: 'Used car not found' })
  update(@Param('id') id: string, @Body() updateUsedCarDto: UpdateUsedCarDto) {
    return this.usedCarsService.update(id, updateUsedCarDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a used car listing' })
  @ApiParam({ name: 'id', description: 'Used car ID' })
  @ApiResponse({
    status: 200,
    description: 'Used car deleted successfully',
    type: UsedCar,
  })
  @ApiResponse({ status: 404, description: 'Used car not found' })
  remove(@Param('id') id: string) {
    return this.usedCarsService.remove(id);
  }
}
