import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { SparePartsService } from './spare-parts.service';
import { CreateSparePartDto } from './dto/create-spare-part.dto';
import { UpdateSparePartDto } from './dto/update-spare-part.dto';
import { FilterSparePartsDto } from './dto/filter-spare-parts.dto';

@ApiTags('spare-parts')
@Controller('spare-parts')
export class SparePartsController {
  constructor(private readonly sparePartsService: SparePartsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new spare part' })
  @ApiResponse({ status: 201, description: 'Spare part created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createSparePartDto: CreateSparePartDto) {
    return this.sparePartsService.create(createSparePartDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all spare parts with pagination and filters' })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated list of spare parts',
  })
  findAll(@Query() filterDto: FilterSparePartsDto) {
    return this.sparePartsService.findAll(filterDto);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get all part categories' })
  @ApiResponse({ status: 200, description: 'Returns list of categories' })
  getCategories() {
    return this.sparePartsService.getCategories();
  }

  @Get('brands')
  @ApiOperation({ summary: 'Get all part brands' })
  @ApiResponse({ status: 200, description: 'Returns list of brands' })
  getBrands() {
    return this.sparePartsService.getBrands();
  }

  @Get('part-number/:partNumber')
  @ApiOperation({ summary: 'Get a spare part by part number' })
  @ApiParam({ name: 'partNumber', description: 'Part number' })
  @ApiResponse({ status: 200, description: 'Returns the spare part' })
  @ApiResponse({ status: 404, description: 'Spare part not found' })
  findByPartNumber(@Param('partNumber') partNumber: string) {
    return this.sparePartsService.findByPartNumber(partNumber);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a spare part by ID' })
  @ApiParam({ name: 'id', description: 'Spare part ID' })
  @ApiResponse({ status: 200, description: 'Returns the spare part' })
  @ApiResponse({ status: 404, description: 'Spare part not found' })
  findOne(@Param('id') id: string) {
    return this.sparePartsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a spare part' })
  @ApiParam({ name: 'id', description: 'Spare part ID' })
  @ApiResponse({ status: 200, description: 'Spare part updated successfully' })
  @ApiResponse({ status: 404, description: 'Spare part not found' })
  update(
    @Param('id') id: string,
    @Body() updateSparePartDto: UpdateSparePartDto,
  ) {
    return this.sparePartsService.update(id, updateSparePartDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a spare part' })
  @ApiParam({ name: 'id', description: 'Spare part ID' })
  @ApiResponse({ status: 200, description: 'Spare part deleted successfully' })
  @ApiResponse({ status: 404, description: 'Spare part not found' })
  remove(@Param('id') id: string) {
    return this.sparePartsService.remove(id);
  }
}
