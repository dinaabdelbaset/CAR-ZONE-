import { Link } from "react-router-dom";
import { ICar } from "../data/cars";
import { Fuel, Gauge, Users } from "lucide-react";

interface CarCardProps {
  car: ICar;
  onAddToCompare?: (car: ICar) => void;
  isInCompare?: boolean;
}

export function CarCard({ car, onAddToCompare, isInCompare }: CarCardProps) {
  // Defensive: handle both string and object for brand, fuelType, transmission
  const brand = typeof car.brand === "object" ? car.brand.name : car.brand;
  const fuelType =
    typeof car.fuelType === "object" ? car.fuelType.name : car.fuelType;
  const transmission =
    typeof car.transmission === "object"
      ? car.transmission.name
      : car.transmission;

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 transition-all hover:shadow-lg group">
      <Link to={`/car/${car.id}`} className="block">
        <div className="aspect-[4/3] overflow-hidden bg-gray-100">
          <img
            src={car.image}
            alt={`${brand} ${car.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      <div className="p-5">
        <Link to={`/car/${car.id}`}>
          <h3 className="text-xl text-black mb-1 group-hover:text-gray-700 transition-colors">
            {brand} {car.model}
          </h3>
        </Link>
        <p className="text-gray-600 mb-4">{car.year}</p>

        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Fuel size={16} />
            <span>{fuelType}</span>
          </div>
          <div className="flex items-center gap-1">
            <Gauge size={16} />
            <span>{transmission}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{car.seating}</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-3xl text-black">${car.price.toLocaleString()}</p>
        </div>

        <div className="flex gap-2">
          <Link
            to={`/car/${car.id}`}
            className="flex-1 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-center"
          >
            View Details
          </Link>
          {onAddToCompare && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onAddToCompare(car);
              }}
              disabled={isInCompare}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                isInCompare
                  ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                  : "bg-white text-black border-black hover:bg-black hover:text-white"
              }`}
            >
              {isInCompare ? "Added" : "Compare"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
