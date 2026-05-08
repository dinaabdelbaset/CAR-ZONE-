import { useQuery } from "@tanstack/react-query";
import { API_HOST } from "../data/apiConfig";
import { ICar } from "../data/cars";

export interface CarsApiResponse {
  data: ICar[];
  meta: Record<string, any>;
}

export function useCars({
  page = 1,
  limit = 10,
}: { page?: number; limit?: number } = {}) {
  return useQuery({
    queryKey: ["cars", page, limit],
    queryFn: async () => {
      const res = await fetch(`${API_HOST}/cars?page=${page}&limit=${limit}`);
      const json = await res.json();
      // console.log("🚀 ~ useCars ~ res:", json);
      if (!res.ok) throw new Error("Failed to fetch cars");
      return json;
    },
  });
}
// Fetch all cars without pagination
export function useAllCars() {
  return useQuery({
    queryKey: ["allCars"],
    queryFn: async () => {
      const res = await fetch(`${API_HOST}/cars`);
      if (!res.ok) throw new Error("Failed to fetch all cars");
      return res.json();
    },
  });
}
// Fetch cars with pagination and featured filter
async function fetchFeaturedCars({
  page = 1,
  limit = 10,
  isFeatured = true,
}: { page?: number; limit?: number; isFeatured?: boolean } = {}) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    isFeatured: String(isFeatured),
  });

  const res = await fetch(`${API_HOST}/cars?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch featured cars");

  return res.json();
}

// React Query hook for featured cars
export function useFeaturedCars({
  page = 1,
  limit = 10,
  isFeatured = true,
}: { page?: number; limit?: number; isFeatured?: boolean } = {}) {
  return useQuery({
    queryKey: ["featuredCars", page, limit, isFeatured],
    queryFn: () => fetchFeaturedCars({ page, limit, isFeatured }),
  });
}

export function useCarDetails(carId?: string) {
  if (!carId) {
    throw new Error("Car ID is required to fetch car details");
  }
  return useQuery({
    queryKey: ["carDetails", carId],
    queryFn: async () => {
      const res = await fetch(`${API_HOST}/cars/${carId}`);
      const json = await res.json();
      if (!res.ok) throw new Error("Failed to fetch car details");
      return json;
    },
  });
}
