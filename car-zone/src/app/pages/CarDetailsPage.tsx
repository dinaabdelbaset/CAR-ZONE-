import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ICar } from "../data/cars";
import { ArrowLeft, Check, Phone, Calendar } from "lucide-react";
import { useCarDetails, useAllCars } from "../hooks/useCars";
import { Spinner } from "../components/Spinner";
import { CheckoutModal } from "../components/CheckoutModal";

export function CarDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [compareCars, setCompareCars] = useState<ICar[]>([]);
  const { data: allCarsData } = useAllCars();
  const carsData = allCarsData?.data || [];
  const { data: carDetailsData, isLoading: isCarDetailsLoading } =
    useCarDetails(id);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("compareCars");
    if (saved) {
      setCompareCars(JSON.parse(saved));
    }
  }, []);

  if (isCarDetailsLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <Spinner />
      </div>
    );
  }

  if (!carDetailsData && !isCarDetailsLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl text-black mb-4">Car Not Found</h1>
          <Link
            to="/browse"
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors inline-block"
          >
            Browse Cars
          </Link>
        </div>
      </div>
    );
  }

  const images = carDetailsData.images || [carDetailsData.image];
  const isInCompare = compareCars.some((c) => c.id === carDetailsData.id);

  const handleAddToCompare = () => {
    if (compareCars.length >= 4) {
      alert("You can compare up to 4 cars at a time");
      return;
    }

    if (isInCompare) {
      return;
    }

    const newCompareCars = [...compareCars, carDetailsData];
    setCompareCars(newCompareCars);
    localStorage.setItem("compareCars", JSON.stringify(newCompareCars));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <Link
          to="/browse"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          Back to Browse
        </Link>

        <div className="grid grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <div>
            <div className="mb-4">
              <img
                src={images[selectedImage]}
                alt={`${carDetailsData.brand} ${carDetailsData.model}`}
                className="w-full h-[500px] object-cover rounded-lg"
              />
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-black"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${carDetailsData.brand.name} ${carDetailsData.model} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Details */}
          <div>
            <div className="mb-6">
              <h1 className="text-5xl text-black mb-2">
                {carDetailsData.brand.name} {carDetailsData.model}
              </h1>
              <p className="text-xl text-gray-600">{carDetailsData.year}</p>
            </div>

            <div className="mb-8">
              <p className="text-5xl text-black">
                ${carDetailsData.price.toLocaleString()}
              </p>
            </div>

            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                {carDetailsData.description}
              </p>
            </div>

            {/* Specifications */}
            <div className="mb-8">
              <h2 className="text-2xl text-black mb-4">Specifications</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Body Type</p>
                  <p className="text-lg text-black">
                    {carDetailsData.bodyType.name}
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Engine</p>
                  <p className="text-lg text-black">{carDetailsData.engine}</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Fuel Type</p>
                  <p className="text-lg text-black">
                    {carDetailsData.fuelType.name}
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Mileage</p>
                  <p className="text-lg text-black">{carDetailsData.mileage}</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Transmission</p>
                  <p className="text-lg text-black">
                    {carDetailsData.transmission.name}
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Seating</p>
                  <p className="text-lg text-black">
                    {carDetailsData.seating} seats
                  </p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h2 className="text-2xl text-black mb-4">Key Features</h2>
              <div className="grid grid-cols-2 gap-3">
                {carDetailsData.features.map(
                  (feature: string, index: number) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check
                        size={20}
                        className="text-black mt-0.5 flex-shrink-0"
                      />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCompare}
                disabled={isInCompare}
                className={`w-full py-4 rounded-lg border-2 transition-colors ${
                  isInCompare
                    ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                    : "bg-white text-black border-black hover:bg-black hover:text-white"
                }`}
              >
                {isInCompare ? "Added to Comparison" : "Add to Compare"}
              </button>

              {isInCompare && (
                <Link
                  to="/compare"
                  className="block w-full bg-gray-900 text-white py-4 rounded-lg hover:bg-gray-800 transition-colors text-center"
                >
                  View Comparison
                </Link>
              )}

              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setIsCheckoutOpen(true)}
                  className="bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 font-semibold"
                >
                  Buy Now
                </button>
                <button className="bg-white text-black border-2 border-black py-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 font-semibold">
                  <Phone size={20} />
                  Contact Dealer
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Cars */}
        <div className="mt-16">
          <h2 className="text-3xl text-black mb-6">Similar Vehicles</h2>
          <div className="grid grid-cols-3 gap-6">
            {carsData
              .filter(
                (car: ICar) =>
                  car.id !== carDetailsData.id &&
                  (car.bodyType.name === carDetailsData.bodyType.name ||
                    car.brand.name === carDetailsData.brand.name),
              )
              .slice(0, 3)
              .map((similarCar: ICar) => (
                <Link
                  key={similarCar.id}
                  to={`/car/${similarCar.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg overflow-hidden border border-gray-200 transition-all hover:shadow-lg">
                    <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                      <img
                        src={similarCar.image}
                        alt={`${similarCar.brand.name} ${similarCar.model}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl text-black mb-1">
                        {similarCar.brand.name} {similarCar.model}
                      </h3>
                      <p className="text-gray-600 mb-2">{similarCar.year}</p>
                      <p className="text-2xl text-black">
                        ${similarCar.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
      
      {carDetailsData && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          itemType="Car"
          itemId={carDetailsData.id || carDetailsData._id}
          itemName={`${carDetailsData.brand.name || carDetailsData.brand} ${carDetailsData.model}`}
          amount={carDetailsData.price}
        />
      )}
    </div>
  );
}
