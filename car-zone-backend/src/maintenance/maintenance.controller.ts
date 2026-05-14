import { Controller, Get, Post, Body, Param, Put, Request, UseGuards } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { CreateUserCarDto } from './dto/create-user-car.dto';
import { CreateMaintenanceRequestDto } from './dto/create-maintenance-request.dto';
import { CreateMaintenanceRecordDto } from './dto/create-maintenance-record.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('maintenance')
@UseGuards(JwtAuthGuard)
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  // User Cars
  @Post('cars')
  addUserCar(@Request() req, @Body() createDto: CreateUserCarDto) {
    return this.maintenanceService.addUserCar(req.user.userId, createDto);
  }

  @Get('cars')
  getUserCars(@Request() req) {
    return this.maintenanceService.getUserCars(req.user.userId);
  }

  @Get('identity/:vin')
  getCarIdentity(@Param('vin') vin: string) {
    return this.maintenanceService.getCarIdentity(vin);
  }

  @Get('car/:carId/records')
  getCarRecords(@Param('carId') carId: string) {
    return this.maintenanceService.getCarRecords(carId);
  }

  // Maintenance Requests
  @Post('requests')
  createRequest(@Request() req, @Body() createDto: CreateMaintenanceRequestDto) {
    return this.maintenanceService.createRequest(req.user.userId, createDto);
  }

  @Get('requests/my')
  getUserRequests(@Request() req) {
    return this.maintenanceService.getUserRequests(req.user.userId);
  }

  @Post('requests/:id/cancel')
  cancelRequest(@Request() req, @Param('id') id: string) {
    return this.maintenanceService.cancelRequest(req.user.userId, id);
  }

  @Get('requests/all')
  getAllRequests() {
    return this.maintenanceService.getAllRequests(); // Admin only in real app
  }

  @Put('requests/:id/assign')
  assignEngineer(
    @Param('id') id: string, 
    @Body('engineerId') engineerId: string,
    @Body('estimatedDuration') estimatedDuration?: string
  ) {
    return this.maintenanceService.assignEngineer(id, engineerId, estimatedDuration);
  }

  @Get('requests/assigned')
  getAssignedRequests(@Request() req) {
    return this.maintenanceService.getAssignedRequests(req.user.userId); // For Engineer role
  }

  // Maintenance Records
  @Post('records')
  addRecord(@Request() req, @Body() createDto: CreateMaintenanceRecordDto) {
    return this.maintenanceService.addRecord(req.user.userId, createDto); // For Engineer role
  }
}
