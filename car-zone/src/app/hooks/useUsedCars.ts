import { useQuery } from "@tanstack/react-query";
import { API_HOST } from "../data/apiConfig";

export function useUsedCars({
  page = 1,
  limit = 10,
}: { page?: number; limit?: number } = {}) {
  return useQuery({
    queryKey: ["usedCars", page, limit],
    queryFn: async () => {
      const res = await fetch(
        `${API_HOST}/used-cars?page=${page}&limit=${limit}`,
      );
      const data = await res.json();

      if (!res.ok) throw new Error("Failed to fetch used cars");
      return data;
    },
  });
}

export function useUsedCarBrands() {
  return useQuery({
    queryKey: ["UsedCarBrands"],
    queryFn: async () => {
      const res = await fetch(`${API_HOST}/used-cars/brands`);
      if (!res.ok) throw new Error("Failed to fetch brands");
      return await res.json();
    },
  });
}
