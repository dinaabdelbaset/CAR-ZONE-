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
import { TransmissionsService } from './transmissions.service';
import { CreateTransmissionDto } from './dto/create-transmission.dto';
import { UpdateTransmissionDto } from './dto/update-transmission.dto';

@ApiTags('transmissions')
@Controller('transmissions')
export class TransmissionsController {
  constructor(private readonly transmissionsService: TransmissionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new transmission type' })
  @ApiResponse({
    status: 201,
    description: 'Transmission created successfully',
  })
  create(@Body() createTransmissionDto: CreateTransmissionDto) {
    return this.transmissionsService.create(createTransmissionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all transmission types' })
  @ApiResponse({ status: 200, description: 'Returns all transmissions' })
  findAll() {
    return this.transmissionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a transmission by ID' })
  @ApiParam({ name: 'id', description: 'Transmission ID' })
  @ApiResponse({ status: 200, description: 'Returns the transmission' })
  @ApiResponse({ status: 404, description: 'Transmission not found' })
  findOne(@Param('id') id: string) {
    return this.transmissionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a transmission' })
  @ApiParam({ name: 'id', description: 'Transmission ID' })
  @ApiResponse({
    status: 200,
    description: 'Transmission updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Transmission not found' })
  update(
    @Param('id') id: string,
    @Body() updateTransmissionDto: UpdateTransmissionDto,
  ) {
    return this.transmissionsService.update(id, updateTransmissionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a transmission' })
  @ApiParam({ name: 'id', description: 'Transmission ID' })
  @ApiResponse({
    status: 200,
    description: 'Transmission deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Transmission not found' })
  remove(@Param('id') id: string) {
    return this.transmissionsService.remove(id);
  }
}
