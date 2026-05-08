import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Edit } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_HOST } from "../../../data/apiConfig";
import { toast } from "sonner";

interface EditSparePartModalProps {
  part: any;
}

export function EditSparePartModal({ part }: EditSparePartModalProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: part.name || "",
    category: part.category || "Brakes",
    brand: part.brand || part.manufacturer || "",
    price: part.price || 0,
    image: part.image || "https://example.com/part.jpg",
    description: part.description || "",
    partNumber: part.partNumber || "",
    warranty: part.warranty || "",
    condition: part.condition || "New",
  });

  useEffect(() => {
    if (open) {
      setFormData({
        name: part.name || "",
        category: part.category || "Brakes",
        brand: part.brand || part.manufacturer || "",
        price: part.price || 0,
        image: part.image || "https://example.com/part.jpg",
        description: part.description || "",
        partNumber: part.partNumber || "",
        warranty: part.warranty || "",
        condition: part.condition || "New",
      });
    }
  }, [open, part]);

  const mutation = useMutation({
    mutationFn: async (updatedPart: any) => {
      const res = await fetch(`${API_HOST}/spare-parts/${part._id || part.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPart),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to update spare part");
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("Spare Part updated successfully!");
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["adminSpareParts"] });
    },
    onError: (err: any) => {
      toast.error(`Error updating spare part: ${err.message}`);
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
          <DialogTitle>Edit Spare Part</DialogTitle>
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
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : "Update Spare Part"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
