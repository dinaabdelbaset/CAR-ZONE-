import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
import { MaintenanceService } from './maintenance/maintenance.service';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const usersService = app.get(UsersService);
  const maintenanceService = app.get(MaintenanceService);

  // 1. Check if dina122@test.com exists
  let user: any = await usersService.findByEmail('dina122@test.com');
  if (!user) {
    user = (await usersService.create({
      name: 'Dina',
      email: 'dina122@test.com',
      password: await bcrypt.hash('password', 10),
      role: 'Customer',
    } as any)) as any;
    console.log('Created user Dina');
  }

  // 2. Add a car to this user
  const userCars = await maintenanceService.getUserCars(user._id.toString());
  if (userCars.length === 0) {
    await maintenanceService.addUserCar(user._id.toString(), {
      brand: 'Toyota',
      model: 'Corolla 2024',
      vin: 'VIN-' + Math.floor(Math.random() * 1000000),
      purchaseDate: new Date(),
      plate: 'أ ب ت 123',
    } as any);
    console.log('Added a car for Dina');
  } else {
    console.log('Dina already has cars');
  }

  await app.close();
}

bootstrap();
