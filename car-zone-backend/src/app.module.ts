import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CarsModule } from './cars/cars.module';
import { BrandsModule } from './brands/brands.module';
import { BodyTypesModule } from './body-types/body-types.module';
import { FuelTypesModule } from './fuel-types/fuel-types.module';
import { TransmissionsModule } from './transmissions/transmissions.module';
import { SeederModule } from './seeder/seeder.module';
import { SparePartsModule } from './spare-parts/spare-parts.module';
import { UsedCarsModule } from './used-cars/used-cars.module';
import { AdminModule } from './admin/admin.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    CarsModule,
    BrandsModule,
    BodyTypesModule,
    FuelTypesModule,
    TransmissionsModule,
    SeederModule,
    SparePartsModule,
    UsedCarsModule,
    AdminModule,
    UsersModule,
    OrdersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
