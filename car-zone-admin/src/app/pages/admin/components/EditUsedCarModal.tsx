import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Edit } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_HOST } from "../../../data/apiConfig";
import { toast } from "sonner";

interface EditUsedCarModalProps {
  car: any;
}

export function EditUsedCarModal({ car }: EditUsedCarModalProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    brand: car.brand || "",
    model: car.model || "",
    year: car.year || 2020,
    price: car.price || 0,
    mileage: car.mileage || 0,
    bodyType: car.bodyType || "Sedan",
    fuelType: car.fuelType || "Gasoline",
    transmission: car.transmission || "Automatic",
    condition: car.condition || "Good",
  });

  useEffect(() => {
    if (open) {
      setFormData({
        brand: car.brand || "",
        model: car.model || "",
        year: car.year || 2020,
        price: car.price || 0,
        mileage: car.mileage || 0,
        bodyType: car.bodyType || "Sedan",
        fuelType: car.fuelType || "Gasoline",
        transmission: car.transmission || "Automatic",
        condition: car.condition || "Good",
      });
    }
  }, [open, car]);

  const mutation = useMutation({
    mutationFn: async (updatedCar: any) => {
      const res = await fetch(`${API_HOST}/used-cars/${car._id || car.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCar),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to update used car");
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("Used Car updated successfully!");
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["adminUsedCars"] });
    },
    onError: (err: any) => {
      toast.error(`Error updating used car: ${err.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Used Car</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Brand</label>
              <input
                required
                className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                placeholder="e.g. Toyota"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Model</label>
              <input
                required
                className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                placeholder="e.g. Corolla"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Year</label>
              <input
                required
                type="number"
                className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Price ($)</label>
              <input
                required
                type="number"
                className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Mileage (km)</label>
              <input
                required
                type="number"
                className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                value={formData.mileage}
                onChange={(e) => setFormData({ ...formData, mileage: parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Condition</label>
              <select
                className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
              >
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
              </select>
            </div>
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : "Update Used Car"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
