import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_HOST } from "../../data/apiConfig";
import { toast } from "sonner";
import { AddSparePartModal } from "./components/AddSparePartModal";
import { EditSparePartModal } from "./components/EditSparePartModal";

export function AdminSpareParts() {
  const queryClient = useQueryClient();

  const { data: response, isLoading, error } = useQuery({
    queryKey: ["adminSpareParts"],
    queryFn: async () => {
      const res = await fetch(`${API_HOST}/spare-parts`);
      if (!res.ok) throw new Error("Failed to fetch spare parts");
      return res.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${API_HOST}/spare-parts/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete spare part");
    },
    onSuccess: () => {
      toast.success("Spare part deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["adminSpareParts"] });
    },
    onError: () => {
      toast.error("Error deleting spare part");
    },
  });

  const spareParts = response?.data || response || [];

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this spare part?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <div className="p-8">Loading spare parts...</div>;
  if (error) return <div className="p-8 text-red-500">Error loading spare parts</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-800">Spare Parts Management</h2>
        <AddSparePartModal />
      </div>

      <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="font-semibold text-gray-600">Part Name</TableHead>
              <TableHead className="font-semibold text-gray-600">Category</TableHead>
              <TableHead className="font-semibold text-gray-600">Brand</TableHead>
              <TableHead className="font-semibold text-gray-600">Price</TableHead>
              <TableHead className="text-right font-semibold text-gray-600">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {spareParts.map((part: any) => (
              <TableRow key={part._id || part.id} className="hover:bg-gray-50 transition-colors">
                <TableCell className="font-medium text-gray-900">{part.name}</TableCell>
                <TableCell className="text-gray-600">{part.category}</TableCell>
                <TableCell className="text-gray-600">{part.brand || part.manufacturer}</TableCell>
                <TableCell className="text-gray-600">${part.price?.toLocaleString()}</TableCell>
                <TableCell className="text-right space-x-2">
                  <EditSparePartModal part={part} />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                    onClick={() => handleDelete(part._id || part.id)}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {spareParts.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  No spare parts found in the database.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
