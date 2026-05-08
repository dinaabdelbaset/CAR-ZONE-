export interface ICar {
  id: string;
  brand: { name: string };
  model: string;
  year: number;
  price: number;
  bodyType: { name: string };
  fuelType: { name: string };
  transmission: { name: string };
  mileage: string;
  engine: string;
  seating: number;
  image: string;
  images?: string[];
  features: string[];
  description: string;
}
export interface IBrand {
  id: string;

  name: string;

  logo?: string;

  country?: string;

  description?: string;
}

export interface IBodyType {
  name: string;
  id: string;
}

export interface IFuelType {
  name: string;
  id: string;
}

export interface ITransmission {
  name: string;
  id: string;
}

export const carsData: ICar[] = [
  {
    id: "1",
    brand: { name: "Porsche" },
    model: "911 Carrera",
    year: 2024,
    price: 115000,
    bodyType: { name: "Coupe" },
    fuelType: { name: "Gasoline" },
    transmission: { name: "Automatic" },
    mileage: "18/24 MPG",
    engine: "3.0L Twin-Turbo H6",
    seating: 4,
    image:
      "https://images.unsplash.com/photo-1647340764627-11713b9d0f65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcG9ydHMlMjBjYXIlMjBzaG93cm9vbXxlbnwxfHx8fDE3NzAxNTUwODN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1647340764627-11713b9d0f65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcG9ydHMlMjBjYXIlMjBzaG93cm9vbXxlbnwxfHx8fDE3NzAxNTUwODN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1696581084306-591db2e1af14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBjYXIlMjByZWR8ZW58MXx8fHwxNzcwMDQ5MDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1636613112990-1b6e9ba0e356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjb3VwZSUyMGNhcnxlbnwxfHx8fDE3NzAxNTUwODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    features: [
      "Adaptive Cruise Control",
      "Lane Departure Warning",
      "Premium Sound System",
      "Leather Interior",
      "Sport Suspension",
      "LED Headlights",
      "Parking Sensors",
      "Heated Seats",
    ],
    description:
      "The iconic Porsche 911 Carrera combines timeless design with cutting-edge performance. Featuring a rear-mounted engine and precise handling, this sports car delivers an exhilarating driving experience.",
  },
  {
    id: "2",
    brand: { name: "BMW" },
    model: "3 Series",
    year: 2024,
    price: 45000,
    bodyType: { name: "Sedan" },
    fuelType: { name: "Gasoline" },
    transmission: { name: "Automatic" },
    mileage: "26/36 MPG",
    engine: "2.0L Turbo I4",
    seating: 5,
    image:
      "https://images.unsplash.com/photo-1766918070754-0518b6505df5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzZWRhbiUyMGNhcnxlbnwxfHx8fDE3NzAxNDY5NzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1766918070754-0518b6505df5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzZWRhbiUyMGNhcnxlbnwxfHx8fDE3NzAxNDY5NzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    features: [
      "Apple CarPlay/Android Auto",
      "Sunroof",
      "Keyless Entry",
      "Rear Camera",
      "Dual-Zone Climate Control",
      "Premium Audio",
      "Power Seats",
      "Bluetooth",
    ],
    description:
      "The BMW 3 Series offers the perfect balance of luxury and performance. With its dynamic handling and sophisticated interior, it's the ultimate driving machine for daily commutes and weekend getaways.",
  },
  {
    id: "3",
    brand: { name: "Range Rover" },
    model: "Sport",
    year: 2024,
    price: 82000,
    bodyType: { name: "SUV" },
    fuelType: { name: "Hybrid" },
    transmission: { name: "Automatic" },
    mileage: "22/28 MPG",
    engine: "3.0L Turbo I6 + Electric",
    seating: 7,
    image:
      "https://images.unsplash.com/photo-1747414632749-6c8b14ba30fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXYlMjBjYXIlMjBleHRlcmlvcnxlbnwxfHx8fDE3NzAxNTUwODN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1747414632749-6c8b14ba30fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXYlMjBjYXIlMjBleHRlcmlvcnxlbnwxfHx8fDE3NzAxNTUwODN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1758219944444-0331b661d163?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBzdXYlMjB2ZWhpY2xlfGVufDF8fHx8MTc3MDExNTM5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    features: [
      "All-Wheel Drive",
      "Terrain Response System",
      "Meridian Sound System",
      "Panoramic Roof",
      "Third Row Seating",
      "Air Suspension",
      "360° Camera",
      "Head-Up Display",
    ],
    description:
      "The Range Rover Sport combines luxury with off-road capability. This premium SUV offers exceptional comfort, advanced technology, and the ability to tackle any terrain with confidence.",
  },
  {
    id: "4",
    brand: { name: "Tesla" },
    model: "Model S",
    year: 2024,
    price: 89000,
    bodyType: { name: "Sedan" },
    fuelType: { name: "Electric" },
    transmission: { name: "Automatic" },
    mileage: "405 miles range",
    engine: "Dual Motor AWD",
    seating: 5,
    image:
      "https://images.unsplash.com/photo-1714557632393-64ed972394ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMGNhciUyMG1vZGVybnxlbnwxfHx8fDE3NzAwOTgyNDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1714557632393-64ed972394ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMGNhciUyMG1vZGVybnxlbnwxfHx8fDE3NzAwOTgyNDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    features: [
      "Autopilot",
      "15-inch Touchscreen",
      "Premium Connectivity",
      "Glass Roof",
      "22 Speakers",
      "Over-the-Air Updates",
      "Supercharger Access",
      "Dog Mode",
    ],
    description:
      "The Tesla Model S represents the future of automotive technology. With its impressive range, lightning-fast acceleration, and cutting-edge autonomous features, it redefines what an electric sedan can be.",
  },
  {
    id: "5",
    brand: { name: "Ferrari" },
    model: "F8 Tributo",
    year: 2024,
    price: 280000,
    bodyType: { name: "Coupe" },
    fuelType: { name: "Gasoline" },
    transmission: { name: "Automatic" },
    mileage: "15/19 MPG",
    engine: "3.9L Twin-Turbo V8",
    seating: 2,
    image:
      "https://images.unsplash.com/photo-1696581084306-591db2e1af14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBjYXIlMjByZWR8ZW58MXx8fHwxNzcwMDQ5MDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1696581084306-591db2e1af14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBjYXIlMjByZWR8ZW58MXx8fHwxNzcwMDQ5MDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    features: [
      "Carbon Fiber Body",
      "Racing Seats",
      "Launch Control",
      "Advanced Aerodynamics",
      "Sport Exhaust",
      "Manettino Driving Modes",
      "Brembo Brakes",
      "Alcantara Interior",
    ],
    description:
      "The Ferrari F8 Tributo is a masterpiece of Italian engineering. With 710 horsepower and breathtaking styling, this mid-engine supercar delivers pure driving excitement and exclusivity.",
  },
  {
    id: "6",
    brand: { name: "Mercedes-Benz" },
    model: "GLE 450",
    year: 2024,
    price: 68000,
    bodyType: { name: "SUV" },
    fuelType: { name: "Gasoline" },
    transmission: { name: "Automatic" },
    mileage: "19/26 MPG",
    engine: "3.0L Turbo I6",
    seating: 5,
    image:
      "https://images.unsplash.com/photo-1758219944444-0331b661d163?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBzdXYlMjB2ZWhpY2xlfGVufDF8fHx8MTc3MDExNTM5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1758219944444-0331b661d163?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBzdXYlMjB2ZWhpY2xlfGVufDF8fHx8MTc3MDExNTM5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    features: [
      "MBUX Infotainment",
      "Air Body Control",
      "Burmester Sound",
      "Massage Seats",
      "Wireless Charging",
      "Ambient Lighting",
      "Active Brake Assist",
      "Blind Spot Assist",
    ],
    description:
      "The Mercedes-Benz GLE 450 offers refined luxury and versatile capability. This midsize SUV combines elegant styling with advanced technology and a smooth, powerful driving experience.",
  },
  {
    id: "7",
    brand: { name: "Audi" },
    model: "A6",
    year: 2024,
    price: 56000,
    bodyType: { name: "Sedan" },
    fuelType: { name: "Gasoline" },
    transmission: { name: "Automatic" },
    mileage: "24/32 MPG",
    engine: "2.0L Turbo I4",
    seating: 5,
    image:
      "https://images.unsplash.com/photo-1636613112990-1b6e9ba0e356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjb3VwZSUyMGNhcnxlbnwxfHx8fDE3NzAxNTUwODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1636613112990-1b6e9ba0e356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjb3VwZSUyMGNhcnxlbnwxfHx8fDE3NzAxNTUwODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    features: [
      "Virtual Cockpit",
      "Quattro AWD",
      "Bang & Olufsen Audio",
      "Matrix LED Headlights",
      "Leather Seats",
      "Ventilated Front Seats",
      "Adaptive Suspension",
      "Pre Sense Safety",
    ],
    description:
      "The Audi A6 exemplifies German engineering and sophistication. With its sleek design, luxurious interior, and advanced technology, it's the perfect choice for discerning drivers.",
  },
  {
    id: "8",
    brand: { name: "Chevrolet" },
    model: "Corvette Stingray",
    year: 2024,
    price: 68000,
    bodyType: { name: "Convertible" },
    fuelType: { name: "Gasoline" },
    transmission: { name: "Automatic" },
    mileage: "15/27 MPG",
    engine: "6.2L V8",
    seating: 2,
    image:
      "https://images.unsplash.com/photo-1572281335102-5f780686ee91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb252ZXJ0aWJsZSUyMHNwb3J0cyUyMGNhcnxlbnwxfHx8fDE3NzAxNTUwODV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1572281335102-5f780686ee91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb252ZXJ0aWJsZSUyMHNwb3J0cyUyMGNhcnxlbnwxfHx8fDE3NzAxNTUwODV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    features: [
      "Performance Data Recorder",
      "Magnetic Ride Control",
      "Bose Premium Audio",
      "GT2 Bucket Seats",
      "Head-Up Display",
      "Performance Exhaust",
      "Z51 Performance Package",
      "Carbon Flash Badges",
    ],
    description:
      "The Chevrolet Corvette Stingray is an American icon reimagined. With its mid-engine layout and stunning performance, this convertible delivers supercar thrills at an accessible price point.",
  },
];

export const brands = [
  "Porsche",
  "BMW",
  "Range Rover",
  "Tesla",
  "Ferrari",
  "Mercedes-Benz",
  "Audi",
  "Chevrolet",
];
export const bodyTypes = ["Sedan", "SUV", "Coupe", "Convertible"];
export const fuelTypes = ["Gasoline", "Electric", "Hybrid"];
export const transmissionTypes = ["Automatic", "Manual"];
