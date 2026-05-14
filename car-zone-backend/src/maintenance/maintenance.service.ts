import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserCar, UserCarDocument } from './schemas/user-car.schema';
import { MaintenanceRequest, MaintenanceRequestDocument } from './schemas/maintenance-request.schema';
import { MaintenanceRecord, MaintenanceRecordDocument } from './schemas/maintenance-record.schema';
import { CreateUserCarDto } from './dto/create-user-car.dto';
import { CreateMaintenanceRequestDto } from './dto/create-maintenance-request.dto';
import { CreateMaintenanceRecordDto } from './dto/create-maintenance-record.dto';

import { EmailService } from '../common/email.service';

@Injectable()
export class MaintenanceService {
  constructor(
    @InjectModel(UserCar.name) private userCarModel: Model<UserCarDocument>,
    @InjectModel(MaintenanceRequest.name) private requestModel: Model<MaintenanceRequestDocument>,
    @InjectModel(MaintenanceRecord.name) private recordModel: Model<MaintenanceRecordDocument>,
    private emailService: EmailService,
  ) {}

  // User Car Operations
  async addUserCar(userId: string, createDto: CreateUserCarDto) {
    const car = new this.userCarModel({ ...createDto, userId });
    return car.save();
  }

  async getUserCars(userId: string) {
    return this.userCarModel.find({ userId }).exec();
  }

  async getCarIdentity(vin: string) {
    const car = await this.userCarModel.findOne({ vin }).exec();
    if (!car) throw new NotFoundException('Car not found');
    const records = await this.recordModel.find({ userCarId: car._id }).populate('engineerId', 'name').exec();
    return { car, records };
  }

  // Maintenance Requests
  async createRequest(userId: string, createDto: CreateMaintenanceRequestDto) {
    const request = new this.requestModel({ ...createDto, userId });
    await request.save();
    
    // Simulate sending email to Dashboard Admin
    this.emailService.sendMaintenanceRequestEmail('admin@carzone.com', createDto);
    
    return request;
  }

  async getUserRequests(userId: string) {
    return this.requestModel.find({ userId }).populate('userCarId').exec();
  }

  async cancelRequest(userId: string, requestId: string) {
    const request = await this.requestModel.findOne({ _id: requestId, userId }).exec();
    if (!request) throw new NotFoundException('Request not found');
    
    // Check previous cancellations by this user
    const previousCancellations = await this.requestModel.countDocuments({
      userId,
      status: 'Cancelled'
    }).exec();

    let fee = 0;
    if (previousCancellations > 0) {
      fee = 50; // Apply 50 EGP fee if not first cancellation
    }

    request.status = 'Cancelled' as any;
    request.cancellationFee = fee;
    return request.save();
  }

  async getAllRequests() {
    return this.requestModel.find().populate('userCarId').populate('userId', 'name email').exec();
  }

  async assignEngineer(requestId: string, engineerId: string, estimatedDuration?: string) {
    const request = await this.requestModel.findByIdAndUpdate(
      requestId, 
      { assignedEngineerId: engineerId, status: 'Assigned', estimatedDuration }, 
      { new: true }
    ).populate('userCarId').exec();
    
    // Simulate sending email to the Engineer Admin
    if (request) {
      this.emailService.sendEngineerAssignmentEmail('engineer@carzone.com', request.userCarId, request);
    }
    
    return request;
  }

  async getAssignedRequests(engineerId: string) {
    return this.requestModel.find({ assignedEngineerId: engineerId }).populate('userCarId').exec();
  }

  // Maintenance Records (Digital Identity)
  async addRecord(engineerId: string, createDto: CreateMaintenanceRecordDto) {
    const record = new this.recordModel({ ...createDto, engineerId });
    if (createDto.requestId) {
      await this.requestModel.findByIdAndUpdate(createDto.requestId, { status: 'Completed' });
    }
    return record.save();
  }

  async getCarRecords(userCarId: string) {
    return this.recordModel.find({ userCarId }).populate('engineerId', 'name').exec();
  }
}
