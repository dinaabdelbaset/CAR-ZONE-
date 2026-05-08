export interface UsedCar {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  bodyType: string;
  fuelType: string;
  transmission: string;
  mpg: string;
  engine: string;
  seating: number;
  image: string;
  images?: string[];
  condition: "Excellent" | "Good" | "Fair";
  features: string[];
  description: string;
  previousOwners: number;
  serviceHistory: "Full" | "Partial" | "Unknown";
}

export const usedCarsData: UsedCar[] = [
  {
    id: "u1",
    brand: "Honda",
    model: "Accord",
    year: 2021,
    price: 24500,
    mileage: 32000,
    bodyType: "Sedan",
    fuelType: "Gasoline",
    transmission: "Automatic",
    mpg: "29/35 MPG",
    engine: "1.5L Turbo I4",
    seating: 5,
    image: "https://images.unsplash.com/photo-1690134834996-9c4dac21d712?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VkJTIwc2VkYW4lMjBjYXJ8ZW58MXx8fHwxNzcwMTU2MjY4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    images: ["https://images.unsplash.com/photo-1690134834996-9c4dac21d712?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VkJTIwc2VkYW4lMjBjYXJ8ZW58MXx8fHwxNzcwMTU2MjY4fDA&ixlib=rb-4.1.0&q=80&w=1080"],
    condition: "Excellent",
    features: ["Backup Camera", "Bluetooth", "Cruise Control", "Keyless Entry", "Lane Keep Assist", "Adaptive Cruise Control"],
    description: "Well-maintained Honda Accord with low mileage. Single owner vehicle with complete service records. Non-smoker, garage kept.",
    previousOwners: 1,
    serviceHistory: "Full",
  },
  {
    id: "u2",
    brand: "Toyota",
    model: "Camry",
    year: 2020,
    price: 22000,
    mileage: 45000,
    bodyType: "Sedan",
    fuelType: "Hybrid",
    transmission: "Automatic",
    mpg: "51/53 MPG",
    engine: "2.5L I4 Hybrid",
    seating: 5,
    image: "https://images.unsplash.com/photo-1576495187801-2140cb43167f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmUtb3duZWQlMjB2ZWhpY2xlfGVufDF8fHx8MTc3MDE1NjI2OHww&ixlib=rb-4.1.0&q=80&w=1080",
    images: ["https://images.unsplash.com/photo-1576495187801-2140cb43167f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmUtb3duZWQlMjB2ZWhpY2xlfGVufDF8fHx8MTc3MDE1NjI2OHww&ixlib=rb-4.1.0&q=80&w=1080"],
    condition: "Good",
    features: ["Hybrid Engine", "Rear Camera", "Apple CarPlay", "Android Auto", "Power Seats", "Dual Climate Control"],
    description: "Fuel-efficient hybrid Camry in excellent running condition. Perfect for daily commuting with outstanding gas mileage.",
    previousOwners: 2,
    serviceHistory: "Full",
  },
  {
    id: "u3",
    brand: "Ford",
    model: "Explorer",
    year: 2019,
    price: 28500,
    mileage: 58000,
    bodyType: "SUV",
    fuelType: "Gasoline",
    transmission: "Automatic",
    mpg: "20/27 MPG",
    engine: "2.3L Turbo I4",
    seating: 7,
    image: "https://images.unsplash.com/photo-1747414632749-6c8b14ba30fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXYlMjBjYXIlMjBleHRlcmlvcnxlbnwxfHx8fDE3NzAxNTUwODN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    images: ["https://images.unsplash.com/photo-1747414632749-6c8b14ba30fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXYlMjBjYXIlMjBleHRlcmlvcnxlbnwxfHx8fDE3NzAxNTUwODN8MA&ixlib=rb-4.1.0&q=80&w=1080"],
    condition: "Good",
    features: ["Third Row Seating", "All-Wheel Drive", "SYNC 3", "Navigation", "Blind Spot Monitor", "Heated Seats"],
    description: "Spacious family SUV with three rows of seating. Great condition with regular maintenance. Perfect for large families.",
    previousOwners: 1,
    serviceHistory: "Full",
  },
  {
    id: "u4",
    brand: "Mazda",
    model: "CX-5",
    year: 2022,
    price: 26800,
    mileage: 18000,
    bodyType: "SUV",
    fuelType: "Gasoline",
    transmission: "Automatic",
    mpg: "25/31 MPG",
    engine: "2.5L I4",
    seating: 5,
    image: "https://images.unsplash.com/photo-1758219944444-0331b661d163?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBzdXYlMjB2ZWhpY2xlfGVufDF8fHx8MTc3MDExNTM5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    images: ["https://images.unsplash.com/photo-1758219944444-0331b661d163?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBzdXYlMjB2ZWhpY2xlfGVufDF8fHx8MTc3MDExNTM5N3ww&ixlib=rb-4.1.0&q=80&w=1080"],
    condition: "Excellent",
    features: ["Leather Interior", "Sunroof", "Bose Audio", "Adaptive Cruise", "Lane Keep Assist", "Parking Sensors"],
    description: "Nearly new Mazda CX-5 with premium features and very low mileage. Still under factory warranty.",
    previousOwners: 1,
    serviceHistory: "Full",
  },
  {
    id: "u5",
    brand: "Volkswagen",
    model: "Jetta",
    year: 2020,
    price: 18900,
    mileage: 42000,
    bodyType: "Sedan",
    fuelType: "Gasoline",
    transmission: "Automatic",
    mpg: "30/40 MPG",
    engine: "1.4L Turbo I4",
    seating: 5,
    image: "https://images.unsplash.com/photo-1766918070754-0518b6505df5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzZWRhbiUyMGNhcnxlbnwxfHx8fDE3NzAxNDY5NzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    images: ["https://images.unsplash.com/photo-1766918070754-0518b6505df5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzZWRhbiUyMGNhcnxlbnwxfHx8fDE3NzAxNDY5NzV8MA&ixlib=rb-4.1.0&q=80&w=1080"],
    condition: "Good",
    features: ["Backup Camera", "Bluetooth", "Alloy Wheels", "Power Windows", "Cruise Control", "USB Ports"],
    description: "Reliable and fuel-efficient Jetta with a smooth ride. Great commuter car with excellent highway mileage.",
    previousOwners: 2,
    serviceHistory: "Partial",
  },
  {
    id: "u6",
    brand: "Nissan",
    model: "Rogue",
    year: 2021,
    price: 25500,
    mileage: 35000,
    bodyType: "SUV",
    fuelType: "Gasoline",
    transmission: "Automatic",
    mpg: "27/35 MPG",
    engine: "2.5L I4",
    seating: 5,
    image: "https://images.unsplash.com/photo-1747414632749-6c8b14ba30fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXYlMjBjYXIlMjBleHRlcmlvcnxlbnwxfHx8fDE3NzAxNTUwODN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    images: ["https://images.unsplash.com/photo-1747414632749-6c8b14ba30fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXYlMjBjYXIlMjBleHRlcmlvcnxlbnwxfHx8fDE3NzAxNTUwODN8MA&ixlib=rb-4.1.0&q=80&w=1080"],
    condition: "Excellent",
    features: ["ProPILOT Assist", "Around View Monitor", "Remote Start", "Heated Seats", "LED Headlights", "Apple CarPlay"],
    description: "Popular compact SUV with advanced safety features. Excellent fuel economy for an SUV class vehicle.",
    previousOwners: 1,
    serviceHistory: "Full",
  },
];

export const usedCarBrands = ["Honda", "Toyota", "Ford", "Mazda", "Volkswagen", "Nissan"];
export const conditions = ["Excellent", "Good", "Fair"];