import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  async sendMaintenanceRequestEmail(adminEmail: string, requestDetails: any) {
    this.logger.log(`[EMAIL SENT TO ADMIN]: ${adminEmail}`);
    this.logger.log(`Subject: New Maintenance Request`);
    this.logger.log(`Body: A new maintenance request (${requestDetails.type}) has been created for Car ID: ${requestDetails.userCarId}`);
    // Here you would use nodemailer or SendGrid
  }

  async sendEngineerAssignmentEmail(engineerEmail: string, carDetails: any, requestDetails: any) {
    this.logger.log(`[EMAIL SENT TO ENGINEER]: ${engineerEmail}`);
    this.logger.log(`Subject: New Car Assignment for Maintenance`);
    this.logger.log(`Body: You have been assigned a new maintenance task.`);
    this.logger.log(`Car Details: ${JSON.stringify(carDetails)}`);
    this.logger.log(`Maintenance Type: ${requestDetails.type}`);
  }
}
