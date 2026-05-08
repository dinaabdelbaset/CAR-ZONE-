import { useState, useMemo, useEffect } from "react";
import { usedCarBrands, conditions, IUsedCar } from "../data/usedCars";
import { Link } from "react-router-dom";
import { Fuel, Gauge, Users, MapPin, CheckCircle } from "lucide-react";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import { Slider } from "../components/ui/slider";
import { useUsedCarBrands, useUsedCars } from "../hooks/useUsedCars";
import { Spinner } from "../components/Spinner";
// import { useBrands } from "../hooks/useBrands";

interface UsedCarFilters {
  brands: string[];
  conditions: string[];
  priceRange: [number, number];
  mileageRange: [number, number];
}

export function UsedCarsPage() {
  const { data, isLoading, isError } = useUsedCars({ page: 1, limit: 20 });
  const usedCarsData = data?.data || [];

  const {
    data: usedCarBrandsData,
    isLoading: isBrandsLoading,
    isError: isBrandsError,
  } = useUsedCarBrands();

  const maxPrice = useMemo(() => {
    if (!usedCarsData || usedCarsData.length === 0) {
      console.log("No used cars data available");
      return 1000000; // Default max price if no data
    }
    console.log("Calculating max price from used cars data");
    return Math.max(...usedCarsData.map((car: IUsedCar) => car.price));
  }, [usedCarsData]);

  const minPrice = useMemo(() => {
    if (!usedCarsData || usedCarsData.length === 0) {
      console.log("No used cars data available");
      return 0; // Default min price if no data
    }
    console.log("Calculating min price from used cars data");
    return Math.min(...usedCarsData.map((car: IUsedCar) => car.price));
  }, [usedCarsData]);

  const maxMileage = useMemo(() => {
    if (!usedCarsData || usedCarsData.length === 0) {
      console.log("No used cars data available");
      return 200000; // Default max mileage if no data
    }
    return Math.max(...usedCarsData.map((car: IUsedCar) => car.mileage));
  }, [usedCarsData]);
  const minMileage = useMemo(() => {
    if (!usedCarsData || usedCarsData.length === 0) {
      console.log("No used cars data available");
      return 0; // Default min mileage if no data
    }
    return Math.min(...usedCarsData.map((car: IUsedCar) => car.mileage));
  }, [usedCarsData]);
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      priceRange: [minPrice, maxPrice],
      mileageRange: [minMileage, maxMileage],
    }));
  }, [minPrice, maxPrice, minMileage, maxMileage]);
  const [filters, setFilters] = useState<UsedCarFilters>({
    brands: [],
    conditions: [],
    priceRange: [minPrice, maxPrice],
    mileageRange: [minMileage, maxMileage],
  });

  const filteredCars = useMemo(() => {
    return usedCarsData.filter((car: IUsedCar) => {
      if (filters.brands.length > 0 && !filters.brands.includes(car.brand)) {
        return false;
      }
      if (
        filters.conditions.length > 0 &&
        !filters.conditions.includes(car.condition)
      ) {
        return false;
      }
      if (
        car.price < filters.priceRange[0] ||
        car.price > filters.priceRange[1]
      ) {
        return false;
      }
      if (
        car.mileage < filters.mileageRange[0] ||
        car.mileage > filters.mileageRange[1]
      ) {
        return false;
      }
      return true;
    });
  }, [filters, usedCarsData]);

  const handleBrandChange = (brand: string, checked: boolean) => {
    const newBrands = checked
      ? [...filters.brands, brand]
      : filters.brands.filter((b) => b !== brand);
    setFilters({ ...filters, brands: newBrands });
  };

  const handleConditionChange = (condition: string, checked: boolean) => {
    const newConditions = checked
      ? [...filters.conditions, condition]
      : filters.conditions.filter((c) => c !== condition);
    setFilters({ ...filters, conditions: newConditions });
  };

  const handleReset = () => {
    setFilters({
      brands: [],
      conditions: [],
      priceRange: [minPrice, maxPrice],
      mileageRange: [minMileage, maxMileage],
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-xl text-red-600">
          Failed to load used cars. Please try again later.
        </p>
      </div>
    );
  }
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <div className="w-72 bg-white p-6 border-r border-gray-200 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl text-black">Filters</h2>
          <button
            onClick={handleReset}
            className="text-sm text-gray-600 hover:text-black transition-colors"
          >
            Reset All
          </button>
        </div>

        {/* Brand Filter */}
        <div className="mb-6">
          {!isBrandsLoading && !isBrandsError && (
            <>
              <h3 className="text-black mb-3">Brand</h3>
              <div className="space-y-2">
                {usedCarBrandsData?.map((brand: string, idx: number) => {
                  return (
                    <div
                      key={`${brand}-${idx}`}
                      className="flex items-center gap-2"
                    >
                      <Checkbox
                        id={`used-brand-${brand}`}
                        checked={filters.brands.includes(brand)}
                        onCheckedChange={(checked) =>
                          handleBrandChange(brand, checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={`used-brand-${brand}`}
                        className="text-sm text-gray-700 cursor-pointer"
                      >
                        {brand}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Condition Filter */}
        <div className="mb-6">
          <h3 className="text-black mb-3">Condition</h3>
          <div className="space-y-2">
            {conditions.map((condition) => (
              <div key={condition} className="flex items-center gap-2">
                <Checkbox
                  id={`condition-${condition}`}
                  checked={filters.conditions.includes(condition)}
                  onCheckedChange={(checked) =>
                    handleConditionChange(condition, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`condition-${condition}`}
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  {condition}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h3 className="text-black mb-3">Price Range</h3>
          <Slider
            min={minPrice}
            max={maxPrice}
            step={1000}
            value={filters.priceRange}
            onValueChange={(value) =>
              setFilters({ ...filters, priceRange: [value[0], value[1]] })
            }
            className="mb-2"
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>${filters.priceRange[0].toLocaleString()}</span>
            <span>${filters.priceRange[1].toLocaleString()}</span>
          </div>
        </div>

        {/* Mileage Range */}
        <div className="mb-6">
          <h3 className="text-black mb-3">Mileage</h3>
          <Slider
            min={minMileage}
            max={maxMileage}
            step={5000}
            value={filters.mileageRange}
            onValueChange={(value) =>
              setFilters({ ...filters, mileageRange: [value[0], value[1]] })
            }
            className="mb-2"
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{filters.mileageRange[0].toLocaleString()} mi</span>
            <span>{filters.mileageRange[1].toLocaleString()} mi</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl text-black mb-2">Used Cars</h1>
            <p className="text-gray-600">
              Quality pre-owned vehicles with verified history • Found{" "}
              {filteredCars.length}{" "}
              {filteredCars.length === 1 ? "vehicle" : "vehicles"}
            </p>
          </div>

          {/* Cars Grid */}
          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-3 gap-6">
              {filteredCars.map((car: IUsedCar) => {
                return <UsedCarCard key={car.id} car={car} />;
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600 mb-4">
                No cars match your current filters
              </p>
              <button
                onClick={handleReset}
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function UsedCarCard({ car }: { car: IUsedCar }) {
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "Excellent":
        return "bg-green-100 text-green-800";
      case "Good":
        return "bg-blue-100 text-blue-800";
      case "Fair":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 transition-all hover:shadow-lg group">
      <Link to={`/used-car/${car.id}`} className="block">
        <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
          <img
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <span
              className={`px-3 py-1 rounded-full text-xs ${getConditionColor(car.condition)}`}
            >
              {car.condition}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-5">
        <Link to={`/used-car/${car.id}`}>
          <h3 className="text-xl text-black mb-1 group-hover:text-gray-700 transition-colors">
            {car.year} {car.brand} {car.model}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
          <MapPin size={14} />
          <span>{car.mileage.toLocaleString()} miles</span>
          {car.serviceHistory === "Full" && (
            <>
              <span>•</span>
              <CheckCircle size={14} className="text-green-600" />
              <span className="text-green-600">Full History</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Fuel size={16} />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-1">
            <Gauge size={16} />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{car.seating}</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-3xl text-black">${car.price.toLocaleString()}</p>
        </div>

        <Link
          to={`/used-car/${car.id}`}
          className="block w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-center"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
