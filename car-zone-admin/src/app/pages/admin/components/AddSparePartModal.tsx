import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_HOST } from "../../../data/apiConfig";
import { toast } from "sonner";

export function AddSparePartModal() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: "",
    category: "Brakes",
    brand: "",
    price: 0,
    image: "https://example.com/part.jpg",
    description: "High quality spare part",
    partNumber: "",
    warranty: "1 Year",
    condition: "New",
  });

  const mutation = useMutation({
    mutationFn: async (newPart: any) => {
      const res = await fetch(`${API_HOST}/spare-parts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPart),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to add spare part");
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("Spare Part added successfully!");
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["adminSpareParts"] });
    },
    onError: (err: any) => {
      toast.error(`Error adding spare part: ${err.message}`);
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
          <Plus className="mr-2 h-4 w-4" /> Add Spare Part
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Spare Part</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Part Name</label>
              <input
                required
                className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                placeholder="e.g. Brake Pad"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select
                className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Brakes">Brakes</option>
                <option value="Engine">Engine</option>
                <option value="Suspension">Suspension</option>
                <option value="Transmission">Transmission</option>
                <option value="Electrical">Electrical</option>
                <option value="Body">Body</option>
                <option value="Interior">Interior</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Brand</label>
              <input
                required
                className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                placeholder="e.g. Brembo"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
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
              <label className="text-sm font-medium">Part Number</label>
              <input
                required
                className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                placeholder="e.g. BP-1234"
                value={formData.partNumber}
                onChange={(e) => setFormData({ ...formData, partNumber: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Warranty</label>
              <input
                required
                className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                placeholder="e.g. 1 Year"
                value={formData.warranty}
                onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
              />
            </div>
          </div>
          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={mutation.isPending}>
            {mutation.isPending ? "Adding..." : "Save Spare Part"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
