import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  constructor() {}

  async getDashboardStats() {
    // In a real scenario, this would aggregate data from MongoDB (Cars, Users, Orders, etc.)
    // For now, we return mock data matching the frontend's layout requirements
    return {
      revenue: {
        total: 1231000,
        increase: 20.1,
      },
      activeCars: {
        total: 2350,
        newThisMonth: 180,
      },
      spareParts: {
        total: 12234,
        increase: 19,
      },
      activeUsers: {
        total: 573,
        newSinceLastHour: 201,
      },
      salesData: [
        { name: "Jan", total: 120000 },
        { name: "Feb", total: 150000 },
        { name: "Mar", total: 180000 },
        { name: "Apr", total: 220000 },
        { name: "May", total: 250000 },
        { name: "Jun", total: 310000 },
      ],
      visitsData: [
        { name: "Mon", visitors: 4000 },
        { name: "Tue", visitors: 3000 },
        { name: "Wed", visitors: 2000 },
        { name: "Thu", visitors: 2780 },
        { name: "Fri", visitors: 1890 },
        { name: "Sat", visitors: 2390 },
        { name: "Sun", visitors: 3490 },
      ]
    };
  }
}
