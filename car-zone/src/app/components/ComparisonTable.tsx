import { ICar } from "../data/cars";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

interface ComparisonTableProps {
  comparableCars: ICar[];
  onRemoveCar: (carId: string) => void;
}

export function ComparisonTable({
  comparableCars,
  onRemoveCar,
}: ComparisonTableProps) {
  if (comparableCars.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-600 mb-4">
          No cars selected for comparison
        </p>
        <Link
          to="/browse"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Browse Cars
        </Link>
      </div>
    );
  }

  const specs = [
    {
      label: "Price",
      key: "price",
      format: (val: number) => `$${val.toLocaleString()}`,
    },
    { label: "Year", key: "year" },
    { label: "Body Type", key: "bodyType" },
    { label: "Engine", key: "engine" },
    { label: "Fuel Type", key: "fuelType" },
    { label: "Mileage", key: "mileage" },
    { label: "Transmission", key: "transmission" },
    { label: "Seating", key: "seating" },
  ];

  const getDifferenceClass = (spec: string, carIndex: number) => {
    const values = comparableCars.map((car) => car[spec as keyof ICar]);

    const uniqueValues = new Set(values);

    if (uniqueValues.size <= 1) return "";

    // Highlight differences
    return "bg-yellow-50";
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-gray-300">
            <th className="p-4 text-left bg-gray-50 sticky left-0 z-10">
              <span className="text-black">Specification</span>
            </th>
            {comparableCars.map((car) => {
              return (
                <th key={car.id} className="p-4 min-w-[280px] relative">
                  <button
                    onClick={() => onRemoveCar(car.id)}
                    className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                    title="Remove from comparison"
                  >
                    <X size={20} className="text-gray-600" />
                  </button>
                  <div className="mt-6">
                    <img
                      src={car.image}
                      alt={`${car.brand.name} ${car.model}`}
                      className="w-full h-40 object-cover rounded-lg mb-3"
                    />
                    <h3 className="text-lg text-black">
                      {car.brand.name} {car.model}
                    </h3>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {specs.map((spec) => {
            return (
              <tr key={spec.key} className="border-b border-gray-200">
                <td className="p-4 bg-gray-50 sticky left-0 z-10">
                  <span className="text-black">{spec.label}</span>
                </td>
                {comparableCars.map((car, index) => {
                  let value = car[spec.key as keyof ICar];
                  // Fix for object fields
                  if (
                    spec.key === "bodyType" ||
                    spec.key === "fuelType" ||
                    spec.key === "transmission"
                  ) {
                    value = (value as { name: string })?.name;
                  }
                  const displayValue = spec.format
                    ? spec.format(value as number)
                    : value;

                  return (
                    <td
                      key={car.id}
                      className={`p-4 text-center ${getDifferenceClass(spec.key, index)}`}
                    >
                      <span className="text-gray-800">
                        {displayValue as string}
                      </span>
                    </td>
                  );
                })}
              </tr>
            );
          })}

          {/* Features Comparison */}
          <tr className="border-b border-gray-200">
            <td className="p-4 bg-gray-50 sticky left-0 z-10">
              <span className="text-black">Key Features</span>
            </td>
            {comparableCars.map((car) => (
              <td key={car.id} className="p-4 align-top">
                <ul className="space-y-1 text-sm text-gray-700">
                  {car.features.slice(0, 5).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-black mt-0.5">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>

          {/* Action Row */}
          <tr>
            <td className="p-4 bg-gray-50 sticky left-0 z-10"></td>
            {comparableCars.map((car) => (
              <td key={car.id} className="p-4">
                <Link
                  to={`/car/${car.id}`}
                  className="block w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-center"
                >
                  View Full Details
                </Link>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
