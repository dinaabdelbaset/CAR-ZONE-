import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_HOST } from "../../../data/apiConfig";
import { toast } from "sonner";

export function AddUsedCarModal() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: 2020,
    price: 0,
    mileage: 0,
    bodyType: "Sedan",
    fuelType: "Gasoline",
    transmission: "Automatic",
    mpg: "25 MPG",
    engine: "2.0L",
    seating: 5,
    image: "https://example.com/car.jpg",
    condition: "Good",
    description: "Good condition used car",
    previousOwners: 1,
    serviceHistory: "Full",
  });

  const mutation = useMutation({
    mutationFn: async (newCar: any) => {
      const res = await fetch(`${API_HOST}/used-cars`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCar),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to add used car");
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("Used Car added successfully!");
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["adminUsedCars"] });
    },
    onError: (err: any) => {
      toast.error(`Error adding used car: ${err.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-red-600 hover:bg-red-700 text-white flex items-center">
          <Plus className="mr-2 h-4 w-4" /> Add Used Car
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Used Car</DialogTitle>
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
          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={mutation.isPending}>
            {mutation.isPending ? "Adding..." : "Save Used Car"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
