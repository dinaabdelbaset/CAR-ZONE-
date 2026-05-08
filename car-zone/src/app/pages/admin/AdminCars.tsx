import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_HOST } from "../../data/apiConfig";
import { toast } from "sonner";
import { AddCarModal } from "./components/AddCarModal";

export function AdminCars() {
  const queryClient = useQueryClient();

  // Fetch cars from backend
  const { data: carsResponse, isLoading, error } = useQuery({
    queryKey: ["adminCars"],
    queryFn: async () => {
      const res = await fetch(`${API_HOST}/cars`);
      if (!res.ok) throw new Error("Failed to fetch cars");
      return res.json();
    },
  });

  // Delete car mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${API_HOST}/cars/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete car");
    },
    onSuccess: () => {
      toast.success("Car deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["adminCars"] });
    },
    onError: () => {
      toast.error("Error deleting car");
    },
  });

  const cars = carsResponse?.data || carsResponse || [];

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this car?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <div className="p-8">Loading cars...</div>;
  if (error) return <div className="p-8 text-red-500">Error loading cars</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-800">Cars Management</h2>
        <AddCarModal />
      </div>

      <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="font-semibold text-gray-600">Make & Model</TableHead>
              <TableHead className="font-semibold text-gray-600">Year</TableHead>
              <TableHead className="font-semibold text-gray-600">Price</TableHead>
              <TableHead className="font-semibold text-gray-600">Status</TableHead>
              <TableHead className="text-right font-semibold text-gray-600">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cars.map((car: any) => (
              <TableRow key={car._id || car.id} className="hover:bg-gray-50 transition-colors">
                <TableCell className="font-medium text-gray-900">
                  {car.brand?.name || car.make} {car.model}
                </TableCell>
                <TableCell className="text-gray-600">{car.year}</TableCell>
                <TableCell className="text-gray-600">${car.price?.toLocaleString()}</TableCell>
                <TableCell>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700`}>
                    Available
                  </span>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200">
                    <Edit className="h-4 w-4" />
                  </Button>
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
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
