import { useState } from "react";
import { Link } from "react-router-dom";
import { carsData, brands, bodyTypes, ICar } from "../data/cars";
import { CarCard } from "../components/CarCard";
import { Search, ArrowRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useFeaturedCars } from "../hooks/useCars";

export function HomePage() {
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedBodyType, setSelectedBodyType] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  const {
    data,
    isLoading: isFeaturedLoading,
    isError,
  } = useFeaturedCars({
    page: 1,
    limit: 3,
    isFeatured: true,
  });
  const featuredCars = data?.data || [];

  const handleQuickSearch = () => {
    const params = new URLSearchParams();
    if (selectedBrand) params.append("brand", selectedBrand);
    if (selectedBodyType) params.append("bodyType", selectedBodyType);
    if (maxPrice) params.append("maxPrice", maxPrice);

    window.location.href = `/browse?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-black overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1647340764627-11713b9d0f65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcG9ydHMlMjBjYXIlMjBzaG93cm9vbXxlbnwxfHx8fDE3NzAxNTUwODN8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Hero"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-6xl text-white mb-4">
              Find Your Perfect Drive
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Explore our premium collection of luxury and performance vehicles.
              Your dream car awaits.
            </p>
            <div className="flex gap-4">
              <Link
                to="/browse"
                className="bg-white text-black px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                Browse Cars
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/compare"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-black transition-colors"
              >
                Compare Models
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Search Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl text-black mb-6 flex items-center gap-2">
              <Search size={28} />
              Quick Search
            </h2>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Brand
                </label>
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Brand</SelectItem>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Body Type
                </label>
                <Select
                  value={selectedBodyType}
                  onValueChange={setSelectedBodyType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Type</SelectItem>
                    {bodyTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Max Price
                </label>
                <Select value={maxPrice} onValueChange={setMaxPrice}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Price</SelectItem>
                    <SelectItem value="50000">$50,000</SelectItem>
                    <SelectItem value="75000">$75,000</SelectItem>
                    <SelectItem value="100000">$100,000</SelectItem>
                    <SelectItem value="150000">$150,000</SelectItem>
                    <SelectItem value="200000">$200,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleQuickSearch}
                  className="w-full bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Search Cars
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl text-black mb-2">Featured Vehicles</h2>
              <p className="text-gray-600">
                Handpicked selections from our premium collection
              </p>
            </div>
            <Link
              to="/browse"
              className="text-black hover:text-gray-600 transition-colors flex items-center gap-2"
            >
              View All
              <ArrowRight size={20} />
            </Link>
          </div>

          {isFeaturedLoading ? (
            <div className="col-span-3 flex justify-center items-center min-h-[200px]">
              <span>Loading featured cars...</span>
            </div>
          ) : isError ? (
            <div className="col-span-3 text-red-500">
              Failed to load featured cars.
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-6">
              {featuredCars.map((car: ICar) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl text-white mb-4">
            Ready to Find Your Dream Car?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Browse our extensive collection or compare multiple models
            side-by-side to make the perfect choice.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/browse"
              className="bg-white text-black px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Browse All Cars
            </Link>
            <Link
              to="/compare"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-black transition-colors"
            >
              Compare Models
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg mb-4">Car Zone</h3>
              <p className="text-gray-400 text-sm">
                Your trusted partner in finding the perfect vehicle and quality
                parts.
              </p>
            </div>
            <div>
              <h3 className="text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/browse" className="text-gray-400 hover:text-white">
                    New Cars
                  </Link>
                </li>
                <li>
                  <Link
                    to="/used-cars"
                    className="text-gray-400 hover:text-white"
                  >
                    Used Cars
                  </Link>
                </li>
                <li>
                  <Link
                    to="/spare-parts"
                    className="text-gray-400 hover:text-white"
                  >
                    Spare Parts
                  </Link>
                </li>
                <li>
                  <Link
                    to="/compare"
                    className="text-gray-400 hover:text-white"
                  >
                    Compare
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-400 hover:text-white"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Phone: (+20) 1154185929</li>
                <li>Email: info@carzone.com</li>
                <li>Hours: Sat-Thu 9AM-10PM</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg mb-4">Location</h3>
              <p className="text-sm text-gray-400">
                22 Ma3di st
                <br />
                Cairo, Egypt
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2026 Car Zone. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
