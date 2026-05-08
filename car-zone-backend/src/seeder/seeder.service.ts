import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand } from '../brands/schemas/brand.schema';
import { BodyType } from '../body-types/schemas/body-type.schema';
import { FuelType } from '../fuel-types/schemas/fuel-type.schema';
import { Transmission } from '../transmissions/schemas/transmission.schema';

import { Car } from '../cars/schemas/car.schema';
import { UsedCar } from '../used-cars/schemas/used-car.schema';
import { SparePart } from '../spare-parts/schemas/spare-part.schema';
import {
  CarCondition,
  ServiceHistory,
} from '../used-cars/enums/used-car.enums';
import { User } from '../users/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeederService implements OnModuleInit {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    @InjectModel(Brand.name) private brandModel: Model<Brand>,
    @InjectModel(BodyType.name) private bodyTypeModel: Model<BodyType>,
    @InjectModel(FuelType.name) private fuelTypeModel: Model<FuelType>,
    @InjectModel(Transmission.name)
    private transmissionModel: Model<Transmission>,
    @InjectModel(Car.name) private carModel: Model<Car>,
    @InjectModel(UsedCar.name) private usedCarModel: Model<UsedCar>,
    @InjectModel(SparePart.name) private sparePartsModel: Model<SparePart>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async onModuleInit() {
    await this.adminSeeder();
    await this.seed();
    await this.usedCarSeeder();
    await this.sparePartSeeder();
  }

  async adminSeeder() {
    const adminExists = await this.userModel.findOne({ email: 'admin@carzone.com' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await this.userModel.create({
        name: 'Super Admin',
        email: 'admin@carzone.com',
        password: hashedPassword,
        role: 'Admin',
        status: 'Active',
      });
      this.logger.log('Admin user seeded.');
    }
  }
  async sparePartSeeder() {
    const sparePartsCount = await this.sparePartsModel.countDocuments();
    if (sparePartsCount > 0) {
      this.logger.log('Spare parts already seeded, skipping...');
      return;
    }

    this.logger.log('Seeding spare parts...');

    const sparePartsData = [
      {
        id: 'p1',
        name: 'Brake Pad Set',
        category: 'Brakes',
        brand: 'Brembo',
        price: 89.99,
        image:
          'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBzcGFyZSUyMHBhcnRzfGVufDF8fHx8MTc3MDE1NjI2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
        description:
          'Premium ceramic brake pads for superior stopping power and reduced dust. Engineered for high performance and longevity.',
        compatibility: ['Honda Accord', 'Toyota Camry', 'Nissan Altima'],
        inStock: true,
        partNumber: 'BP-5000-CER',
        warranty: '2 years',
        condition: 'New',
      },
      {
        id: 'p2',
        name: 'Oil Filter',
        category: 'Engine',
        brand: 'Mobil 1',
        price: 12.99,
        image:
          'https://images.unsplash.com/photo-1762139258224-236877b2c571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBlbmdpbmUlMjBwYXJ0c3xlbnwxfHx8fDE3NzAxMDg0MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description:
          'Extended performance oil filter with synthetic fiber blend. Provides superior filtration and engine protection for up to 20,000 miles.',
        compatibility: ['BMW 3 Series', 'Mercedes-Benz C-Class', 'Audi A4'],
        inStock: true,
        partNumber: 'OF-1000-EP',
        warranty: '1 year',
        condition: 'New',
      },
      {
        id: 'p3',
        name: 'Air Filter',
        category: 'Engine',
        brand: 'K&N',
        price: 54.99,
        image:
          'https://images.unsplash.com/photo-1758813147407-f9c9c1055e3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvJTIwcGFydHMlMjBzdG9yZXxlbnwxfHx8fDE3NzAwNjkxNjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description:
          'High-flow reusable air filter that increases horsepower and acceleration. Washable and reusable for the life of your vehicle.',
        compatibility: ['Ford F-150', 'Chevrolet Silverado', 'Ram 1500'],
        inStock: true,
        partNumber: 'AF-3300-HF',
        warranty: '10 years / 1 million miles',
        condition: 'New',
      },
      {
        id: 'p4',
        name: 'Spark Plugs Set',
        category: 'Ignition',
        brand: 'NGK',
        price: 34.99,
        image:
          'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBzcGFyZSUyMHBhcnRzfGVufDF8fHx8MTc3MDE1NjI2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
        description:
          'Iridium spark plugs for improved fuel efficiency and engine performance. Set of 4 plugs with anti-seize coating.',
        compatibility: ['Honda Civic', 'Toyota Corolla', 'Mazda 3'],
        inStock: true,
        partNumber: 'SP-4400-IR',
        warranty: '3 years',
        condition: 'New',
      },
      {
        id: 'p5',
        name: 'Battery',
        category: 'Electrical',
        brand: 'Optima',
        price: 249.99,
        image:
          'https://images.unsplash.com/photo-1762139258224-236877b2c571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBlbmdpbmUlMjBwYXJ0c3xlbnwxfHx8fDE3NzAxMDg0MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description:
          'RedTop high-performance AGM battery. Spill-proof and vibration resistant with exceptional starting power.',
        compatibility: ['Universal - Check specifications'],
        inStock: true,
        partNumber: 'BAT-8000-AGM',
        warranty: '3 years',
        condition: 'New',
      },
      {
        id: 'p6',
        name: 'Headlight Assembly',
        category: 'Lighting',
        brand: 'OEM',
        price: 189.99,
        image:
          'https://images.unsplash.com/photo-1758813147407-f9c9c1055e3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvJTIwcGFydHMlMjBzdG9yZXxlbnwxfHx8fDE3NzAwNjkxNjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description:
          'Complete LED headlight assembly with integrated daytime running lights. Direct replacement for factory unit.',
        compatibility: ['Ford Escape', 'Ford Edge'],
        inStock: false,
        partNumber: 'HL-6000-LED',
        warranty: '2 years',
        condition: 'New',
      },
      {
        id: 'p7',
        name: 'Wiper Blade Set',
        category: 'Maintenance',
        brand: 'Bosch',
        price: 24.99,
        image:
          'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBzcGFyZSUyMHBhcnRzfGVufDF8fHx8MTc3MDE1NjI2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
        description:
          'All-season beam wiper blades with precision-cut rubber edge. Provides streak-free wiping in all weather conditions.',
        compatibility: ['Universal - Multiple sizes available'],
        inStock: true,
        partNumber: 'WB-2200-AS',
        warranty: '1 year',
        condition: 'New',
      },
      {
        id: 'p8',
        name: 'Radiator',
        category: 'Cooling',
        brand: 'Mishimoto',
        price: 324.99,
        image:
          'https://images.unsplash.com/photo-1762139258224-236877b2c571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBlbmdpbmUlMjBwYXJ0c3xlbnwxfHx8fDE3NzAxMDg0MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description:
          'Performance aluminum radiator with increased cooling capacity. TIG-welded end tanks and brazed aluminum core.',
        compatibility: ['Subaru WRX', 'Subaru STI'],
        inStock: true,
        partNumber: 'RAD-7500-AL',
        warranty: 'Lifetime',
        condition: 'New',
      },
      {
        id: 'p9',
        name: 'Alternator',
        category: 'Electrical',
        brand: 'Denso',
        price: 279.99,
        image:
          'https://images.unsplash.com/photo-1758813147407-f9c9c1055e3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvJTIwcGFydHMlMjBzdG9yZXxlbnwxfHx8fDE3NzAwNjkxNjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description:
          'Remanufactured alternator with OE quality. Tested to ensure reliable charging performance and longevity.',
        compatibility: ['Toyota Camry', 'Toyota RAV4'],
        inStock: true,
        partNumber: 'ALT-9200-RM',
        warranty: '2 years',
        condition: 'Refurbished',
      },
      {
        id: 'p10',
        name: 'Fuel Pump',
        category: 'Fuel System',
        brand: 'Delphi',
        price: 159.99,
        image:
          'https://images.unsplash.com/photo-1762139258224-236877b2c571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBlbmdpbmUlMjBwYXJ0c3xlbnwxfHx8fDE3NzAxMDg0MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description:
          'Electric fuel pump module assembly with fuel level sensor. OE-equivalent quality and performance.',
        compatibility: ['Chevrolet Malibu', 'Chevrolet Cruze'],
        inStock: true,
        partNumber: 'FP-3100-EL',
        warranty: '3 years',
        condition: 'New',
      },
      {
        id: 'p11',
        name: 'Suspension Strut',
        category: 'Suspension',
        brand: 'Monroe',
        price: 134.99,
        image:
          'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBzcGFyZSUyMHBhcnRzfGVufDF8fHx8MTc3MDE1NjI2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
        description:
          'Complete strut assembly with coil spring and mount. Restores ride comfort and handling performance.',
        compatibility: ['Honda CR-V', 'Honda Pilot'],
        inStock: true,
        partNumber: 'ST-5500-CP',
        warranty: 'Limited lifetime',
        condition: 'New',
      },
      {
        id: 'p12',
        name: 'Timing Belt Kit',
        category: 'Engine',
        brand: 'Gates',
        price: 199.99,
        image:
          'https://images.unsplash.com/photo-1758813147407-f9c9c1055e3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvJTIwcGFydHMlMjBzdG9yZXxlbnwxfHx8fDE3NzAwNjkxNjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description:
          'Complete timing belt kit with water pump, tensioners, and all necessary gaskets. Preventive maintenance package.',
        compatibility: ['Volkswagen Passat', 'Audi A4'],
        inStock: true,
        partNumber: 'TB-6600-KT',
        warranty: '2 years',
        condition: 'New',
      },
    ];

    for (const part of sparePartsData) {
      await this.sparePartsModel.create(part);
    }
    this.logger.log('Spare parts seeding completed.');
  }

  async seed() {
    const carCount = await this.carModel.countDocuments();
    if (carCount > 0) {
      this.logger.log('Database already seeded, skipping...');
      return;
    }

    this.logger.log('Seeding database...');

    // Seed Brands
    const brands = [
      'Porsche',
      'BMW',
      'Range Rover',
      'Tesla',
      'Ferrari',
      'Mercedes-Benz',
      'Audi',
      'Chevrolet',
    ];
    const brandDocs = await Promise.all(
      brands.map((name) => this.brandModel.create({ name })),
    );
    const brandMap = new Map(brandDocs.map((b) => [b.name, b._id]));

    // Seed Body Types
    const bodyTypes = ['Sedan', 'SUV', 'Coupe', 'Convertible'];
    const bodyTypeDocs = await Promise.all(
      bodyTypes.map((name) => this.bodyTypeModel.create({ name })),
    );
    const bodyTypeMap = new Map(bodyTypeDocs.map((b) => [b.name, b._id]));

    // Seed Fuel Types
    const fuelTypes = ['Gasoline', 'Electric', 'Hybrid'];
    const fuelTypeDocs = await Promise.all(
      fuelTypes.map((name) => this.fuelTypeModel.create({ name })),
    );
    const fuelTypeMap = new Map(fuelTypeDocs.map((f) => [f.name, f._id]));

    // Seed Transmissions
    const transmissions = ['Automatic', 'Manual'];
    const transmissionDocs = await Promise.all(
      transmissions.map((name) => this.transmissionModel.create({ name })),
    );
    const transmissionMap = new Map(
      transmissionDocs.map((t) => [t.name, t._id]),
    );

    // Seed Cars
    const carsData = [
      {
        brand: 'Porsche',
        model: '911 Carrera',
        year: 2024,
        price: 115000,
        bodyType: 'Coupe',
        fuelType: 'Gasoline',
        transmission: 'Automatic',
        mileage: '18/24 MPG',
        engine: '3.0L Twin-Turbo H6',
        seating: 4,
        image:
          'https://images.unsplash.com/photo-1647340764627-11713b9d0f65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcG9ydHMlMjBjYXIlMjBzaG93cm9vbXxlbnwxfHx8fDE3NzAxNTUwODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
        images: [
          'https://images.unsplash.com/photo-1647340764627-11713b9d0f65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcG9ydHMlMjBjYXIlMjBzaG93cm9vbXxlbnwxfHx8fDE3NzAxNTUwODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
          'https://images.unsplash.com/photo-1696581084306-591db2e1af14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBjYXIlMjByZWR8ZW58MXx8fHwxNzcwMDQ5MDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
          'https://images.unsplash.com/photo-1636613112990-1b6e9ba0e356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjb3VwZSUyMGNhcnxlbnwxfHx8fDE3NzAxNTUwODR8MA&ixlib=rb-4.1.0&q=80&w=1080',
        ],
        features: [
          'Adaptive Cruise Control',
          'Lane Departure Warning',
          'Premium Sound System',
          'Leather Interior',
          'Sport Suspension',
          'LED Headlights',
          'Parking Sensors',
          'Heated Seats',
        ],
        description:
          'The iconic Porsche 911 Carrera combines timeless design with cutting-edge performance. Featuring a rear-mounted engine and precise handling, this sports car delivers an exhilarating driving experience.',
      },
      {
        brand: 'BMW',
        model: '3 Series',
        year: 2024,
        price: 45000,
        bodyType: 'Sedan',
        fuelType: 'Gasoline',
        transmission: 'Automatic',
        mileage: '26/36 MPG',
        engine: '2.0L Turbo I4',
        seating: 5,
        image:
          'https://images.unsplash.com/photo-1766918070754-0518b6505df5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzZWRhbiUyMGNhcnxlbnwxfHx8fDE3NzAxNDY5NzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
        images: [
          'https://images.unsplash.com/photo-1766918070754-0518b6505df5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzZWRhbiUyMGNhcnxlbnwxfHx8fDE3NzAxNDY5NzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
        ],
        features: [
          'Apple CarPlay/Android Auto',
          'Sunroof',
          'Keyless Entry',
          'Rear Camera',
          'Dual-Zone Climate Control',
          'Premium Audio',
          'Power Seats',
          'Bluetooth',
        ],
        description:
          "The BMW 3 Series offers the perfect balance of luxury and performance. With its dynamic handling and sophisticated interior, it's the ultimate driving machine for daily commutes and weekend getaways.",
      },
      {
        brand: 'Range Rover',
        model: 'Sport',
        year: 2024,
        price: 82000,
        bodyType: 'SUV',
        fuelType: 'Hybrid',
        transmission: 'Automatic',
        mileage: '22/28 MPG',
        engine: '3.0L Turbo I6 + Electric',
        seating: 7,
        image:
          'https://images.unsplash.com/photo-1747414632749-6c8b14ba30fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXYlMjBjYXIlMjBleHRlcmlvcnxlbnwxfHx8fDE3NzAxNTUwODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
        images: [
          'https://images.unsplash.com/photo-1747414632749-6c8b14ba30fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXYlMjBjYXIlMjBleHRlcmlvcnxlbnwxfHx8fDE3NzAxNTUwODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
          'https://images.unsplash.com/photo-1758219944444-0331b661d163?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBzdXYlMjB2ZWhpY2xlfGVufDF8fHx8MTc3MDExNTM5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
        ],
        features: [
          'All-Wheel Drive',
          'Terrain Response System',
          'Meridian Sound System',
          'Panoramic Roof',
          'Third Row Seating',
          'Air Suspension',
          '360° Camera',
          'Head-Up Display',
        ],
        description:
          'The Range Rover Sport combines luxury with off-road capability. This premium SUV offers exceptional comfort, advanced technology, and the ability to tackle any terrain with confidence.',
      },
      {
        brand: 'Tesla',
        model: 'Model S',
        year: 2024,
        price: 89000,
        bodyType: 'Sedan',
        fuelType: 'Electric',
        transmission: 'Automatic',
        mileage: '405 miles range',
        engine: 'Dual Motor AWD',
        seating: 5,
        image:
          'https://images.unsplash.com/photo-1714557632393-64ed972394ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMGNhciUyMG1vZGVybnxlbnwxfHx8fDE3NzAwOTgyNDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
        images: [
          'https://images.unsplash.com/photo-1714557632393-64ed972394ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMGNhciUyMG1vZGVybnxlbnwxfHx8fDE3NzAwOTgyNDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
        ],
        features: [
          'Autopilot',
          '15-inch Touchscreen',
          'Premium Connectivity',
          'Glass Roof',
          '22 Speakers',
          'Over-the-Air Updates',
          'Supercharger Access',
          'Dog Mode',
        ],
        description:
          'The Tesla Model S represents the future of automotive technology. With its impressive range, lightning-fast acceleration, and cutting-edge autonomous features, it redefines what an electric sedan can be.',
      },
      {
        brand: 'Ferrari',
        model: 'F8 Tributo',
        year: 2024,
        price: 280000,
        bodyType: 'Coupe',
        fuelType: 'Gasoline',
        transmission: 'Automatic',
        mileage: '15/19 MPG',
        engine: '3.9L Twin-Turbo V8',
        seating: 2,
        image:
          'https://images.unsplash.com/photo-1696581084306-591db2e1af14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBjYXIlMjByZWR8ZW58MXx8fHwxNzcwMDQ5MDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
        images: [
          'https://images.unsplash.com/photo-1696581084306-591db2e1af14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBjYXIlMjByZWR8ZW58MXx8fHwxNzcwMDQ5MDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
        ],
        features: [
          'Carbon Fiber Body',
          'Racing Seats',
          'Launch Control',
          'Advanced Aerodynamics',
          'Sport Exhaust',
          'Manettino Driving Modes',
          'Brembo Brakes',
          'Alcantara Interior',
        ],
        description:
          'The Ferrari F8 Tributo is a masterpiece of Italian engineering. With 710 horsepower and breathtaking styling, this mid-engine supercar delivers pure driving excitement and exclusivity.',
      },
      {
        brand: 'Mercedes-Benz',
        model: 'GLE 450',
        year: 2024,
        price: 68000,
        bodyType: 'SUV',
        fuelType: 'Gasoline',
        transmission: 'Automatic',
        mileage: '19/26 MPG',
        engine: '3.0L Turbo I6',
        seating: 5,
        image:
          'https://images.unsplash.com/photo-1758219944444-0331b661d163?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBzdXYlMjB2ZWhpY2xlfGVufDF8fHx8MTc3MDExNTM5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
        images: [
          'https://images.unsplash.com/photo-1758219944444-0331b661d163?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBzdXYlMjB2ZWhpY2xlfGVufDF8fHx8MTc3MDExNTM5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
        ],
        features: [
          'MBUX Infotainment',
          'Air Body Control',
          'Burmester Sound',
          'Massage Seats',
          'Wireless Charging',
          'Ambient Lighting',
          'Active Brake Assist',
          'Blind Spot Assist',
        ],
        description:
          'The Mercedes-Benz GLE 450 offers refined luxury and versatile capability. This midsize SUV combines elegant styling with advanced technology and a smooth, powerful driving experience.',
      },
      {
        brand: 'Audi',
        model: 'A6',
        year: 2024,
        price: 56000,
        bodyType: 'Sedan',
        fuelType: 'Gasoline',
        transmission: 'Automatic',
        mileage: '24/32 MPG',
        engine: '2.0L Turbo I4',
        seating: 5,
        image:
          'https://images.unsplash.com/photo-1636613112990-1b6e9ba0e356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjb3VwZSUyMGNhcnxlbnwxfHx8fDE3NzAxNTUwODR8MA&ixlib=rb-4.1.0&q=80&w=1080',
        images: [
          'https://images.unsplash.com/photo-1636613112990-1b6e9ba0e356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjb3VwZSUyMGNhcnxlbnwxfHx8fDE3NzAxNTUwODR8MA&ixlib=rb-4.1.0&q=80&w=1080',
        ],
        features: [
          'Virtual Cockpit',
          'Quattro AWD',
          'Bang & Olufsen Audio',
          'Matrix LED Headlights',
          'Leather Seats',
          'Ventilated Front Seats',
          'Adaptive Suspension',
          'Pre Sense Safety',
        ],
        description:
          "The Audi A6 exemplifies German engineering and sophistication. With its sleek design, luxurious interior, and advanced technology, it's the perfect choice for discerning drivers.",
      },
      {
        brand: 'Chevrolet',
        model: 'Corvette Stingray',
        year: 2024,
        price: 68000,
        bodyType: 'Convertible',
        fuelType: 'Gasoline',
        transmission: 'Automatic',
        mileage: '15/27 MPG',
        engine: '6.2L V8',
        seating: 2,
        image:
          'https://images.unsplash.com/photo-1572281335102-5f780686ee91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb252ZXJ0aWJsZSUyMHNwb3J0cyUyMGNhcnxlbnwxfHx8fDE3NzAxNTUwODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
        images: [
          'https://images.unsplash.com/photo-1572281335102-5f780686ee91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb252ZXJ0aWJsZSUyMHNwb3J0cyUyMGNhcnxlbnwxfHx8fDE3NzAxNTUwODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
        ],
        features: [
          'Performance Data Recorder',
          'Magnetic Ride Control',
          'Bose Premium Audio',
          'GT2 Bucket Seats',
          'Head-Up Display',
          'Performance Exhaust',
          'Z51 Performance Package',
          'Carbon Flash Badges',
        ],
        description:
          'The Chevrolet Corvette Stingray is an American icon reimagined. With its mid-engine layout and stunning performance, this convertible delivers supercar thrills at an accessible price point.',
      },
    ];

    for (const carData of carsData) {
      await this.carModel.create({
        brand: brandMap.get(carData.brand),
        model: carData.model,
        year: carData.year,
        price: carData.price,
        bodyType: bodyTypeMap.get(carData.bodyType),
        fuelType: fuelTypeMap.get(carData.fuelType),
        transmission: transmissionMap.get(carData.transmission),
        mileage: carData.mileage,
        engine: carData.engine,
        seating: carData.seating,
        image: carData.image,
        images: carData.images,
        features: carData.features,
        description: carData.description,
      });
    }

    this.logger.log('Database seeded successfully!');
  }

  async usedCarSeeder() {
    const usedCarCount = await this.usedCarModel.countDocuments();
    if (usedCarCount > 0) {
      this.logger.log('Used cars already seeded, skipping...');
      return;
    }

    console.log('Seeding used cars...');

    const usedCarsData = [
      {
        id: 'u1',
        brand: 'Honda',
        model: 'Accord',
        year: 2021,
        price: 24500,
        mileage: 32000,
        bodyType: 'Sedan',
        fuelType: 'Gasoline',
        transmission: 'Automatic',
        mpg: '29/35 MPG',
        engine: '1.5L Turbo I4',
        seating: 5,
        image:
          'https://images.unsplash.com/photo-1690134834996-9c4dac21d712?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VkJTIwc2VkYW4lMjBjYXJ8ZW58MXx8fHwxNzcwMTU2MjY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
        images: [
          'https://images.unsplash.com/photo-1690134834996-9c4dac21d712?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VkJTIwc2VkYW4lMjBjYXJ8ZW58MXx8fHwxNzcwMTU2MjY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
        ],
        condition: 'Excellent',
        features: [
          'Backup Camera',
          'Bluetooth',
          'Cruise Control',
          'Keyless Entry',
          'Lane Keep Assist',
          'Adaptive Cruise Control',
        ],
        description:
          'Well-maintained Honda Accord with low mileage. Single owner vehicle with complete service records. Non-smoker, garage kept.',
        previousOwners: 1,
        serviceHistory: 'Full',
      },
      {
        id: 'u2',
        brand: 'Toyota',
        model: 'Camry',
        year: 2020,
        price: 22000,
        mileage: 45000,
        bodyType: 'Sedan',
        fuelType: 'Hybrid',
        transmission: 'Automatic',
        mpg: '51/53 MPG',
        engine: '2.5L I4 Hybrid',
        seating: 5,
        image:
          'https://images.unsplash.com/photo-1576495187801-2140cb43167f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmUtb3duZWQlMjB2ZWhpY2xlfGVufDF8fHx8MTc3MDE1NjI2OHww&ixlib=rb-4.1.0&q=80&w=1080',
        images: [
          'https://images.unsplash.com/photo-1576495187801-2140cb43167f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmUtb3duZWQlMjB2ZWhpY2xlfGVufDF8fHx8MTc3MDE1NjI2OHww&ixlib=rb-4.1.0&q=80&w=1080',
        ],
        condition: 'Good',
        features: [
          'Hybrid Engine',
          'Rear Camera',
          'Apple CarPlay',
          'Android Auto',
          'Power Seats',
          'Dual Climate Control',
        ],
        description:
          'Fuel-efficient hybrid Camry in excellent running condition. Perfect for daily commuting with outstanding gas mileage.',
        previousOwners: 2,
        serviceHistory: 'Full',
      },
      {
        id: 'u3',
        brand: 'Ford',
        model: 'Explorer',
        year: 2019,
        price: 28500,
        mileage: 58000,
        bodyType: 'SUV',
        fuelType: 'Gasoline',
        transmission: 'Automatic',
        mpg: '20/27 MPG',
        engine: '2.3L Turbo I4',
        seating: 7,
        image:
          'https://images.unsplash.com/photo-1747414632749-6c8b14ba30fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXYlMjBjYXIlMjBleHRlcmlvcnxlbnwxfHx8fDE3NzAxNTUwODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
        images: [
          'https://images.unsplash.com/photo-1747414632749-6c8b14ba30fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXYlMjBjYXIlMjBleHRlcmlvcnxlbnwxfHx8fDE3NzAxNTUwODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
        ],
        condition: 'Good',
        features: [
          'Third Row Seating',
          'All-Wheel Drive',
          'SYNC 3',
          'Navigation',
          'Blind Spot Monitor',
          'Heated Seats',
        ],
        description:
          'Spacious family SUV with three rows of seating. Great condition with regular maintenance. Perfect for large families.',
        previousOwners: 1,
        serviceHistory: 'Full',
      },
      {
        id: 'u4',
        brand: 'Mazda',
        model: 'CX-5',
        year: 2022,
        price: 26800,
        mileage: 18000,
        bodyType: 'SUV',
        fuelType: 'Gasoline',
        transmission: 'Automatic',
        mpg: '25/31 MPG',
        engine: '2.5L I4',
        seating: 5,
        image:
          'https://images.unsplash.com/photo-1758219944444-0331b661d163?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBzdXYlMjB2ZWhpY2xlfGVufDF8fHx8MTc3MDExNTM5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
        images: [
          'https://images.unsplash.com/photo-1758219944444-0331b661d163?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBzdXYlMjB2ZWhpY2xlfGVufDF8fHx8MTc3MDExNTM5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
        ],
        condition: 'Excellent',
        features: [
          'Leather Interior',
          'Sunroof',
          'Bose Audio',
          'Adaptive Cruise',
          'Lane Keep Assist',
          'Parking Sensors',
        ],
        description:
          'Nearly new Mazda CX-5 with premium features and very low mileage. Still under factory warranty.',
        previousOwners: 1,
        serviceHistory: 'Full',
      },
      {
        id: 'u5',
        brand: 'Volkswagen',
        model: 'Jetta',
        year: 2020,
        price: 18900,
        mileage: 42000,
        bodyType: 'Sedan',
        fuelType: 'Gasoline',
        transmission: 'Automatic',
        mpg: '30/40 MPG',
        engine: '1.4L Turbo I4',
        seating: 5,
        image:
          'https://images.unsplash.com/photo-1766918070754-0518b6505df5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzZWRhbiUyMGNhcnxlbnwxfHx8fDE3NzAxNDY5NzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
        images: [
          'https://images.unsplash.com/photo-1766918070754-0518b6505df5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzZWRhbiUyMGNhcnxlbnwxfHx8fDE3NzAxNDY5NzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
        ],
        condition: 'Good',
        features: [
          'Backup Camera',
          'Bluetooth',
          'Alloy Wheels',
          'Power Windows',
          'Cruise Control',
          'USB Ports',
        ],
        description:
          'Reliable and fuel-efficient Jetta with a smooth ride. Great commuter car with excellent highway mileage.',
        previousOwners: 2,
        serviceHistory: 'Partial',
      },
      {
        id: 'u6',
        brand: 'Nissan',
        model: 'Rogue',
        year: 2021,
        price: 25500,
        mileage: 35000,
        bodyType: 'SUV',
        fuelType: 'Gasoline',
        transmission: 'Automatic',
        mpg: '27/35 MPG',
        engine: '2.5L I4',
        seating: 5,
        image:
          'https://images.unsplash.com/photo-1747414632749-6c8b14ba30fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXYlMjBjYXIlMjBleHRlcmlvcnxlbnwxfHx8fDE3NzAxNTUwODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
        images: [
          'https://images.unsplash.com/photo-1747414632749-6c8b14ba30fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXYlMjBjYXIlMjBleHRlcmlvcnxlbnwxfHx8fDE3NzAxNTUwODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
        ],
        condition: 'Excellent',
        features: [
          'ProPILOT Assist',
          'Around View Monitor',
          'Remote Start',
          'Heated Seats',
          'LED Headlights',
          'Apple CarPlay',
        ],
        description:
          'Popular compact SUV with advanced safety features. Excellent fuel economy for an SUV class vehicle.',
        previousOwners: 1,
        serviceHistory: 'Full',
      },
    ];

    for (const usedCar of usedCarsData) {
      await this.usedCarModel.create({
        brand: usedCar.brand,
        model: usedCar.model,
        year: usedCar.year,
        price: usedCar.price,
        mileage: usedCar.mileage,
        bodyType: usedCar.bodyType,
        fuelType: usedCar.fuelType,
        transmission: usedCar.transmission,
        mpg: usedCar.mpg,
        engine: usedCar.engine,
        seating: usedCar.seating,
        image: usedCar.image,
        images: usedCar.images,
        condition: CarCondition[usedCar.condition.toUpperCase()],
        features: usedCar.features,
        description: usedCar.description,
        previousOwners: usedCar.previousOwners,
        serviceHistory: ServiceHistory[usedCar.serviceHistory.toUpperCase()],
      });
    }
    console.log('Used cars seeding completed.');
  }
}
