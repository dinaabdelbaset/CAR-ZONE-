import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_HOST } from "../../../data/apiConfig";
import { toast } from "sonner";

export function AddCarModal() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    model: "",
    year: 2024,
    price: 0,
    mileage: "",
    engine: "",
    seating: 4,
    image: "",
    description: "A great car",
    // Note: In a full app, these would be dropdowns fetching from their respective endpoints
    brand: "650000000000000000000000", // dummy mock ID
    bodyType: "650000000000000000000000", // dummy mock ID
    fuelType: "650000000000000000000000", // dummy mock ID
    transmission: "650000000000000000000000", // dummy mock ID
  });

  const mutation = useMutation({
    mutationFn: async (newCar: any) => {
      const res = await fetch(`${API_HOST}/cars`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCar),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to add car");
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("Car added successfully!");
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["adminCars"] });
    },
    onError: (err: any) => {
      toast.error(`Error adding car: ${err.message}`);
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
          <Plus className="mr-2 h-4 w-4" /> Add New Car
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Car</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Model</label>
              <input
                required
                className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="e.g. Camry"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Year</label>
              <input
                required
                type="number"
                className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Price ($)</label>
              <input
                required
                type="number"
                className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Mileage</label>
              <input
                required
                className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="e.g. 10,000 km"
                value={formData.mileage}
                onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Engine</label>
              <input
                required
                className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="e.g. 2.0L 4-Cylinder"
                value={formData.engine}
                onChange={(e) => setFormData({ ...formData, engine: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Image URL</label>
              <input
                required
                className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="https://..."
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>
          </div>
          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={mutation.isPending}>
            {mutation.isPending ? "Adding..." : "Save Car"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
