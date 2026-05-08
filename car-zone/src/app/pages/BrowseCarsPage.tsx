import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useCars } from "../hooks/useCars";
import { CarCard } from "../components/CarCard";
import { Spinner } from "../components/Spinner";
import { Pagination } from "../components/Pagination";
import { FilterSidebar, Filters } from "../components/FilterSidebar";
import { ICar } from "../data/cars";

export function BrowseCarsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  // Initialize page from search param, default to 1
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [page, setPage] = useState(initialPage);
  const [compareCars, setCompareCars] = useState<ICar[]>([]);

  const { data, isLoading, isError } = useCars();

  const cars = data?.data || [];
  const meta = data?.meta || {};

  // Load compare cars from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("compareCars");
    console.log("🚀 ~ BrowseCarsPage ~ saved:", saved);
    if (saved) {
      setCompareCars(JSON.parse(saved));
    }
  }, []);

  const maxPrice = useMemo(() => {
    if (!cars || cars.length === 0) {
      console.log(
        "cars is empty or undefined, returning default max price",
        cars,
      );
      return 300000;
    }
    return Math.max(...cars.map((car: any) => car.price));
  }, [cars]);

  const minPrice = useMemo(() => {
    if (!cars || cars.length === 0) return 0;
    return Math.min(...cars.map((car: any) => car.price));
  }, [cars]);
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      priceRange: [minPrice, maxPrice],
    }));
  }, [minPrice, maxPrice]);

  // Sync page state with URL param
  useEffect(() => {
    setPage(initialPage);
  }, [initialPage]);
  const [filters, setFilters] = useState<Filters>({
    brands: searchParams.get("brand") ? [searchParams.get("brand")!] : [],
    bodyTypes: searchParams.get("bodyType")
      ? [searchParams.get("bodyType")!]
      : [],
    fuelTypes: [],
    transmissions: [],
    priceRange: [
      minPrice,
      parseInt(searchParams.get("maxPrice") || `${maxPrice}`),
    ],
    yearRange: [2020, 2024],
  });
  const filteredCars = useMemo(() => {
    if (!cars) return [];
    return cars.filter((car: any) => {
      // Brand filter
      const brandName =
        typeof car.brand === "object" ? car.brand.name : car.brand;
      if (filters.brands.length > 0 && !filters.brands.includes(brandName)) {
        return false;
      }
      // Body type filter
      const bodyTypeName =
        typeof car.bodyType === "object" ? car.bodyType.name : car.bodyType;
      if (
        filters.bodyTypes.length > 0 &&
        !filters.bodyTypes.includes(bodyTypeName)
      ) {
        return false;
      }
      // Fuel type filter
      const fuelTypeName =
        typeof car.fuelType === "object" ? car.fuelType.name : car.fuelType;
      if (
        filters.fuelTypes.length > 0 &&
        !filters.fuelTypes.includes(fuelTypeName)
      ) {
        return false;
      }
      // Transmission filter
      const transmissionName =
        typeof car.transmission === "object"
          ? car.transmission.name
          : car.transmission;
      if (
        filters.transmissions.length > 0 &&
        !filters.transmissions.includes(transmissionName)
      ) {
        return false;
      }
      // Price range filter
      if (
        car.price < filters.priceRange[0] ||
        car.price > filters.priceRange[1]
      ) {
        return false;
      }
      // Year range filter
      if (car.year < filters.yearRange[0] || car.year > filters.yearRange[1]) {
        return false;
      }
      return true;
    });
  }, [cars, filters]);
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <Spinner />
      </div>
    );
  }
  const handleAddToCompare = (car: ICar) => {
    if (compareCars.length >= 4) {
      alert("You can compare up to 4 cars at a time");
      return;
    }

    if (compareCars.find((c) => c.id === car.id)) {
      return;
    }

    const newCompareCars = [...compareCars, car];
    setCompareCars(newCompareCars);
    localStorage.setItem("compareCars", JSON.stringify(newCompareCars));
  };

  const isInCompare = (carId: string) => {
    return compareCars.some((c) => c.id === carId);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sticky Filter Sidebar */}
      <FilterSidebar
        filters={filters}
        onFiltersChange={setFilters}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl text-black mb-2">Browse Cars</h1>
            <p className="text-gray-600">
              Found {filteredCars.length}{" "}
              {filteredCars.length === 1 ? "vehicle" : "vehicles"}
            </p>
          </div>

          {/* Compare Bar */}
          {compareCars.length > 0 && (
            <div className="mb-6 bg-black text-white p-4 rounded-lg flex items-center justify-between">
              <div>
                <span className="mr-4">
                  {compareCars.length}{" "}
                  {compareCars.length === 1 ? "car" : "cars"} selected for
                  comparison
                </span>
                {compareCars.map((car) => (
                  <span key={car.id} className="text-sm text-gray-300 mr-3">
                    {typeof car.brand === "object" ? car.brand.name : car.brand}{" "}
                    {car.model}
                  </span>
                ))}
              </div>
              <a
                href="/compare"
                className="bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Compare Now
              </a>
            </div>
          )}

          {/* Cars Grid */}
          {filteredCars.length > 0 ? (
            <>
              <div className="grid grid-cols-3 gap-6">
                {filteredCars.map((car: ICar) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    onAddToCompare={handleAddToCompare}
                    isInCompare={isInCompare(car.id)}
                  />
                ))}
              </div>

              <Pagination
                currentPage={meta.page || page}
                totalPages={meta.totalPages || 1}
                onPageChange={(newPage) => {
                  setPage(newPage);
                  // Update the URL search param for page
                  setSearchParams((prev) => {
                    const params = new URLSearchParams(prev);
                    params.set("page", newPage.toString());
                    return params;
                  });
                }}
              />
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600 mb-4">
                No cars match your current filters
              </p>
              <button
                onClick={() =>
                  setFilters({
                    brands: [],
                    bodyTypes: [],
                    fuelTypes: [],
                    transmissions: [],
                    priceRange: [0, 300000],
                    yearRange: [2020, 2024],
                  })
                }
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
