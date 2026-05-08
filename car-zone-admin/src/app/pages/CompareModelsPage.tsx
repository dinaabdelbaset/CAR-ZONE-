import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ICar, carsData } from "../data/cars";
import { ComparisonTable } from "../components/ComparisonTable";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { useCars } from "../hooks/useCars";

export function CompareModelsPage() {
  const { data, isLoading, isError } = useCars();

  const cars = data?.data || [];
  const meta = data?.meta || {};
  const [compareCars, setCompareCars] = useState<ICar[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("compareCars");
    if (saved) {
      setCompareCars(JSON.parse(saved));
    }
  }, []);

  const handleRemoveCar = (carId: string) => {
    const newCompareCars = compareCars.filter((car) => car.id !== carId);
    setCompareCars(newCompareCars);
    localStorage.setItem("compareCars", JSON.stringify(newCompareCars));
  };

  const handleAddCar = (car: ICar) => {
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
    setIsDialogOpen(false);
  };

  const availableCars = cars.filter(
    (car: ICar) => !compareCars.find((c) => c.id === car.id),
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl text-black mb-2">Compare Models</h1>
          <p className="text-gray-600">
            Compare up to 4 cars side-by-side to find the perfect match
          </p>
        </div>

        {/* Add Car Button */}
        {compareCars.length < 4 && (
          <div className="mb-6">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
                  <Plus size={20} />
                  Add Car to Compare
                  <span className="text-sm text-gray-300">
                    ({compareCars.length}/4)
                  </span>
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Select a Car to Compare</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  Choose a car from the list below to add it to your comparison.
                  You can compare up to 4 cars at a time.
                </DialogDescription>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {availableCars.map((car: ICar) => (
                    <div
                      key={car.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-black transition-colors cursor-pointer"
                      onClick={() => handleAddCar(car)}
                    >
                      <img
                        src={car.image}
                        alt={`${car.brand.name} ${car.model}`}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h3 className="text-lg text-black">
                        {`${car.brand.name} ${car.model}`}
                      </h3>
                      <p className="text-gray-600">{car.year}</p>
                      <p className="text-xl text-black mt-2">
                        ${car.price.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}

        {/* Comparison Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <ComparisonTable
            comparableCars={compareCars}
            onRemoveCar={handleRemoveCar}
          />
        </div>

        {/* Help Text */}
        {compareCars.length > 0 && compareCars.length < 2 && (
          <div className="mt-6 text-center text-gray-600">
            <p>Add at least one more car to start comparing</p>
          </div>
        )}

        {/* Browse Cars Link */}
        {compareCars.length === 0 && (
          <div className="mt-6 text-center">
            <Link
              to="/browse"
              className="text-black hover:text-gray-600 transition-colors"
            >
              or browse all cars to add them to comparison
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
