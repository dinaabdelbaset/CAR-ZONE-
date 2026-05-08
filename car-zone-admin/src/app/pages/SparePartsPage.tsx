import { useState, useMemo, useEffect } from "react";
import { partCategories, partBrands, ISparePart } from "../data/spareParts";
import { Package, CheckCircle, XCircle, Shield, Search } from "lucide-react";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import { Slider } from "../components/ui/slider";
import { Input } from "../components/ui/input";
import {
  useSparePartBrands,
  useSparePartCategories,
  useSpareParts,
} from "../hooks/useSpareParts";
import { Spinner } from "../components/Spinner";
import { Pagination } from "../components/Pagination";
import { useSearchParams, useNavigate } from "react-router-dom";

interface PartsFilters {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  inStockOnly: boolean;
  condition: string[];
}

export function SparePartsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  // Initialize page from search param, default to 1
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [page, setPage] = useState(initialPage);

  const {
    data: spareParts,
    isLoading,
    error,
  } = useSpareParts({ page, limit: 5 });
  // Fetch parts data using the custom hook
  const { data: partCategoriesData, isLoading: categoriesLoading } =
    useSparePartCategories();

  const { data: partBrandsData, isLoading: brandsLoading } =
    useSparePartBrands();

  const sparePartsData = spareParts?.data || []; // Extract parts data from the API response
  const metaData = spareParts?.meta || {}; // Extract metadata if needed
  const [searchQuery, setSearchQuery] = useState("");

  const minPrice = useMemo(() => {
    if (!sparePartsData || sparePartsData.length === 0) return 0;
    return Math.min(...sparePartsData.map((part: ISparePart) => part.price));
  }, [sparePartsData]);

  const maxPrice = useMemo(() => {
    if (!sparePartsData || sparePartsData.length === 0) return 500;
    return Math.max(...sparePartsData.map((part: ISparePart) => part.price));
  }, [sparePartsData]);

  // Sync page state with URL param
  useEffect(() => {
    setPage(initialPage);
  }, [initialPage]);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      priceRange: [minPrice, maxPrice],
    }));
  }, [minPrice, maxPrice]);

  const [filters, setFilters] = useState<PartsFilters>({
    categories: [],
    brands: [],
    priceRange: [minPrice, maxPrice],
    inStockOnly: false,
    condition: [],
  });

  const filteredParts = useMemo(() => {
    return sparePartsData.filter((part: ISparePart) => {
      if (
        searchQuery &&
        !part.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(part.category)
      ) {
        return false;
      }
      if (filters.brands.length > 0 && !filters.brands.includes(part.brand)) {
        return false;
      }
      if (
        part.price < filters.priceRange[0] ||
        part.price > filters.priceRange[1]
      ) {
        return false;
      }
      if (filters.inStockOnly && !part.inStock) {
        return false;
      }
      if (
        filters.condition.length > 0 &&
        !filters.condition.includes(part.condition)
      ) {
        return false;
      }
      return true;
    });
  }, [filters, searchQuery, sparePartsData]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter((c) => c !== category);
    setFilters({ ...filters, categories: newCategories });
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    const newBrands = checked
      ? [...filters.brands, brand]
      : filters.brands.filter((b) => b !== brand);
    setFilters({ ...filters, brands: newBrands });
  };

  const handleConditionChange = (condition: string, checked: boolean) => {
    const newConditions = checked
      ? [...filters.condition, condition]
      : filters.condition.filter((c) => c !== condition);
    setFilters({ ...filters, condition: newConditions });
  };

  const handleReset = () => {
    setFilters({
      categories: [],
      brands: [],
      priceRange: [minPrice, maxPrice],
      inStockOnly: false,
      condition: [],
    });
    setSearchQuery("");
  };
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <Spinner />
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

        {/* In Stock Filter */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <Checkbox
              id="in-stock"
              checked={filters.inStockOnly}
              onCheckedChange={(checked) =>
                setFilters({ ...filters, inStockOnly: checked as boolean })
              }
            />
            <Label
              htmlFor="in-stock"
              className="text-sm text-gray-700 cursor-pointer"
            >
              In Stock Only
            </Label>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="text-black mb-3">Category</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {partCategoriesData?.map((category: string, index: number) => (
              <div
                key={`category-${index}`}
                className="flex items-center gap-2"
              >
                <Checkbox
                  id={`category-${category}`}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={(checked) =>
                    handleCategoryChange(category, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`category-${category}`}
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Filter */}
        <div className="mb-6">
          <h3 className="text-black mb-3">Brand</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {partBrandsData?.map((brand: string, index: number) => (
              <div key={`brand-${index}`} className="flex items-center gap-2">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={filters.brands.includes(brand)}
                  onCheckedChange={(checked) =>
                    handleBrandChange(brand, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`brand-${brand}`}
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  {brand}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Condition Filter */}
        <div className="mb-6">
          <h3 className="text-black mb-3">Condition</h3>
          <div className="space-y-2">
            {["New", "Refurbished", "Used"].map((condition, index) => (
              <div
                key={`condition-${index}`}
                className="flex items-center gap-2"
              >
                <Checkbox
                  id={`condition-${condition}`}
                  checked={filters.condition.includes(condition)}
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
            step={10}
            value={filters.priceRange}
            onValueChange={(value) =>
              setFilters({ ...filters, priceRange: [value[0], value[1]] })
            }
            className="mb-2"
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl text-black mb-4">Spare Parts</h1>

            {/* Search Bar */}
            <div className="relative mb-4">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                type="text"
                placeholder="Search parts by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <p className="text-gray-600">
              Quality OEM and aftermarket parts • Found {filteredParts.length}{" "}
              {filteredParts.length === 1 ? "part" : "parts"}
            </p>
          </div>

          {/* Parts Grid */}
          {filteredParts.length > 0 ? (
            <>
              <div className="grid grid-cols-3 gap-6">
                {filteredParts.map((part: ISparePart) => {
                  return <SparePartCard key={part.id} part={part} />;
                })}
              </div>
              <Pagination
                currentPage={metaData?.page || page}
                totalPages={metaData?.totalPages || 1}
                onPageChange={(newPage) => {
                  setPage(newPage);
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
                No parts match your search or filters
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

function SparePartCard({ part }: { part: ISparePart }) {
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "New":
        return "bg-green-100 text-green-800";
      case "Refurbished":
        return "bg-blue-100 text-blue-800";
      case "Used":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 transition-all hover:shadow-lg group">
      <div className="aspect-square overflow-hidden bg-gray-100 relative">
        <img
          src={part.image}
          alt={part.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-xs ${getConditionColor(part.condition)}`}
          >
            {part.condition}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg text-black">{part.name}</h3>
          {part.inStock ? (
            <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
          ) : (
            <XCircle size={20} className="text-red-600 flex-shrink-0" />
          )}
        </div>

        <p className="text-sm text-gray-600 mb-2">{part.brand}</p>

        <div className="flex items-center gap-2 mb-3">
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
            {part.category}
          </span>
          <span className="text-xs text-gray-500">#{part.partNumber}</span>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {part.description}
        </p>

        <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
          <Shield size={16} />
          <span>{part.warranty} warranty</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-2xl text-black">${part.price}</p>
          {!part.inStock && (
            <span className="text-sm text-red-600">Out of Stock</span>
          )}
        </div>

        <button
          disabled={!part.inStock}
          className={`w-full px-4 py-2 rounded-lg transition-colors ${
            part.inStock
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {part.inStock ? "Add to Cart" : "Notify When Available"}
        </button>

        {part.compatibility.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Compatible with:</p>
            <p className="text-xs text-gray-600 line-clamp-2">
              {part.compatibility.join(", ")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
