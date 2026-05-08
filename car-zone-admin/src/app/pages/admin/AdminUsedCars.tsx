import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_HOST } from "../../data/apiConfig";
import { toast } from "sonner";
import { AddUsedCarModal } from "./components/AddUsedCarModal";
import { EditUsedCarModal } from "./components/EditUsedCarModal";

export function AdminUsedCars() {
  const queryClient = useQueryClient();

  const { data: response, isLoading, error } = useQuery({
    queryKey: ["adminUsedCars"],
    queryFn: async () => {
      const res = await fetch(`${API_HOST}/used-cars`);
      if (!res.ok) throw new Error("Failed to fetch used cars");
      return res.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${API_HOST}/used-cars/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete used car");
    },
    onSuccess: () => {
      toast.success("Used car deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["adminUsedCars"] });
    },
    onError: () => {
      toast.error("Error deleting used car");
    },
  });

  const usedCars = response?.data || response || [];

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this used car?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <div className="p-8">Loading used cars...</div>;
  if (error) return <div className="p-8 text-red-500">Error loading used cars</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-800">Used Cars Management</h2>
        <AddUsedCarModal />
      </div>

      <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="font-semibold text-gray-600">Make & Model</TableHead>
              <TableHead className="font-semibold text-gray-600">Year</TableHead>
              <TableHead className="font-semibold text-gray-600">Mileage</TableHead>
              <TableHead className="font-semibold text-gray-600">Price</TableHead>
              <TableHead className="text-right font-semibold text-gray-600">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usedCars.map((car: any) => (
              <TableRow key={car._id || car.id} className="hover:bg-gray-50 transition-colors">
                <TableCell className="font-medium text-gray-900">
                  {car.brand || car.make} {car.model}
                </TableCell>
                <TableCell className="text-gray-600">{car.year}</TableCell>
                <TableCell className="text-gray-600">{car.mileage?.toLocaleString()} km</TableCell>
                <TableCell className="text-gray-600">${car.price?.toLocaleString()}</TableCell>
                <TableCell className="text-right space-x-2">
                  <EditUsedCarModal car={car} />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                    onClick={() => handleDelete(car._id || car.id)}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {usedCars.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  No used cars found in the database.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
