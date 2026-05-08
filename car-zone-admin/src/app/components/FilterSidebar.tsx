import { useBrands } from "../hooks/useBrands";
import { useBodyTypes } from "../hooks/useBodyTypes";
import { useFuelTypes } from "../hooks/useFuelTypes";
import { useTransmissions } from "../hooks/useTransmissions";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { IBodyType, IBrand, IFuelType, ITransmission } from "../data/cars";

export interface Filters {
  brands: string[];
  bodyTypes: string[];
  fuelTypes: string[];
  transmissions: string[];
  priceRange: [number, number];
  yearRange: [number, number];
}

interface FilterSidebarProps {
  filters: Filters;
  maxPrice: number;
  minPrice: number;
  onFiltersChange: (filters: Filters) => void;
}

export function FilterSidebar({
  filters,
  maxPrice,
  minPrice,
  onFiltersChange,
}: FilterSidebarProps) {
  const { data: brands = [], isLoading: brandsLoading } = useBrands();
  const { data: bodyTypes = [], isLoading: bodyTypesLoading } = useBodyTypes();
  const { data: fuelTypes = [], isLoading: fuelTypesLoading } = useFuelTypes();
  const { data: transmissionTypes = [], isLoading: transmissionsLoading } =
    useTransmissions();
  const handleBrandChange = (brand: string, checked: boolean) => {
    const newBrands = checked
      ? [...filters.brands, brand]
      : filters.brands.filter((b) => b !== brand);
    onFiltersChange({ ...filters, brands: newBrands });
  };

  const handleBodyTypeChange = (bodyType: string, checked: boolean) => {
    const newBodyTypes = checked
      ? [...filters.bodyTypes, bodyType]
      : filters.bodyTypes.filter((bt) => bt !== bodyType);
    onFiltersChange({ ...filters, bodyTypes: newBodyTypes });
  };

  const handleFuelTypeChange = (fuelType: string, checked: boolean) => {
    const newFuelTypes = checked
      ? [...filters.fuelTypes, fuelType]
      : filters.fuelTypes.filter((ft) => ft !== fuelType);
    onFiltersChange({ ...filters, fuelTypes: newFuelTypes });
  };

  const handleTransmissionChange = (transmission: string, checked: boolean) => {
    const newTransmissions = checked
      ? [...filters.transmissions, transmission]
      : filters.transmissions.filter((t) => t !== transmission);
    onFiltersChange({ ...filters, transmissions: newTransmissions });
  };

  const handlePriceChange = (value: number[]) => {
    onFiltersChange({ ...filters, priceRange: [value[0], value[1]] });
  };

  const handleYearChange = (value: number[]) => {
    onFiltersChange({ ...filters, yearRange: [value[0], value[1]] });
  };

  const handleReset = () => {
    onFiltersChange({
      brands: [],
      bodyTypes: [],
      fuelTypes: [],
      transmissions: [],
      priceRange: [minPrice, maxPrice],
      yearRange: [2020, 2024],
    });
  };

  return (
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
        <h3 className="text-black mb-3">Brand</h3>
        <div className="space-y-2">
          {brands.map((brand: IBrand) => (
            <div key={brand.id} className="flex items-center gap-2">
              <Checkbox
                id={`brand-${brand.id}`}
                checked={filters.brands.includes(brand.name)}
                onCheckedChange={(checked) =>
                  handleBrandChange(brand.name, checked as boolean)
                }
              />
              <Label
                htmlFor={`brand-${brand.id}`}
                className="text-sm text-gray-700 cursor-pointer"
              >
                {brand.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h3 className="text-black mb-3">Price Range</h3>
        <div className="mb-2">
          <Slider
            min={minPrice}
            max={maxPrice}
            step={5000}
            value={filters.priceRange}
            onValueChange={handlePriceChange}
            className="mb-2"
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>${filters.priceRange[0].toLocaleString()}</span>
            <span>${filters.priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Body Type Filter */}
      <div className="mb-6">
        <h3 className="text-black mb-3">Body Type</h3>
        <div className="space-y-2">
          {bodyTypes.map((bodyType: IBodyType) => (
            <div key={bodyType.id} className="flex items-center gap-2">
              <Checkbox
                id={`body-${bodyType.id}`}
                checked={filters.bodyTypes.includes(bodyType.name)}
                onCheckedChange={(checked) =>
                  handleBodyTypeChange(bodyType.name, checked as boolean)
                }
              />
              <Label
                htmlFor={`body-${bodyType.id}`}
                className="text-sm text-gray-700 cursor-pointer"
              >
                {bodyType.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Fuel Type Filter */}
      <div className="mb-6">
        <h3 className="text-black mb-3">Fuel Type</h3>
        <div className="space-y-2">
          {fuelTypes.map((fuelType: IFuelType) => (
            <div key={fuelType.id} className="flex items-center gap-2">
              <Checkbox
                id={`fuel-${fuelType.id}`}
                checked={filters.fuelTypes.includes(fuelType.name)}
                onCheckedChange={(checked) =>
                  handleFuelTypeChange(fuelType.name, checked as boolean)
                }
              />
              <Label
                htmlFor={`fuel-${fuelType.id}`}
                className="text-sm text-gray-700 cursor-pointer"
              >
                {fuelType.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Transmission Filter */}
      <div className="mb-6">
        <h3 className="text-black mb-3">Transmission</h3>
        <div className="space-y-2">
          {transmissionTypes.map((transmission: ITransmission) => (
            <div key={transmission.id} className="flex items-center gap-2">
              <Checkbox
                id={`trans-${transmission.id}`}
                checked={filters.transmissions.includes(transmission.name)}
                onCheckedChange={(checked) =>
                  handleTransmissionChange(
                    transmission.name,
                    checked as boolean,
                  )
                }
              />
              <Label
                htmlFor={`trans-${transmission.id}`}
                className="text-sm text-gray-700 cursor-pointer"
              >
                {transmission.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Year Range Filter */}
      <div className="mb-6">
        <h3 className="text-black mb-3">Year</h3>
        <div className="mb-2">
          <Slider
            min={2020}
            max={2024}
            step={1}
            value={filters.yearRange}
            onValueChange={handleYearChange}
            className="mb-2"
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{filters.yearRange[0]}</span>
            <span>{filters.yearRange[1]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
