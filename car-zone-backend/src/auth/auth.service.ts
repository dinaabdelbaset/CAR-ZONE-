import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { MaintenanceService } from '../maintenance/maintenance.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private maintenanceService: MaintenanceService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      // For testing, if the password isn't hashed yet, we check direct match or hashed
      const isMatch = await bcrypt.compare(pass, user.password || '') || pass === user.password;
      if (isMatch) {
        const { password, ...result } = user.toObject();
        return result;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    };
  }

  async register(name: string, email: string, pass: string): Promise<any> {
    const existing = await this.usersService.findByEmail(email);
    if (existing) {
      throw new UnauthorizedException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(pass, 10);
    const user = await this.usersService.create({
      name,
      email,
      password: hashedPassword,
      role: 'Customer',
    } as any);

    // Seed a dummy car so they can test maintenance requests immediately
    await this.maintenanceService.addUserCar(user._id.toString(), {
      brand: 'Hyundai',
      model: 'Tucson 2024',
      vin: 'VIN-' + Math.floor(Math.random() * 100000),
      purchaseDate: new Date(),
      plate: 'س ي ا 999',
    } as any);

    return user;
  }
}
