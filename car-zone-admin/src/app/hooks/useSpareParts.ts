import { useQuery } from "@tanstack/react-query";
import { API_HOST } from "../data/apiConfig";

export function useSpareParts({
  page = 1,
  limit = 10,
}: { page?: number; limit?: number } = {}) {
  // Your hook implementation here
  return useQuery({
    queryKey: ["spareParts", page, limit],
    queryFn: async () => {
      const res = await fetch(
        `${API_HOST}/spare-parts?page=${page}&limit=${limit}`,
      );
      const json = await res.json();
      // console.log("🚀 ~ useSpareParts ~ res:", json);
      if (!res.ok) throw new Error("Failed to fetch spare parts");
      return json;
    },
  });
}
export function useSparePartCategories() {
  return useQuery({
    queryKey: ["sparePartCategories"],
    queryFn: async () => {
      const res = await fetch(`${API_HOST}/spare-parts/categories`);
      const json = await res.json();
      if (!res.ok) throw new Error("Failed to fetch spare part categories");
      return json;
    },
  });
}
export function useSparePartBrands() {
  return useQuery({
    queryKey: ["sparePartBrands"],
    queryFn: async () => {
      const res = await fetch(`${API_HOST}/spare-parts/brands`);
      const json = await res.json();
      if (!res.ok) throw new Error("Failed to fetch spare part brands");
      return json;
    },
  });
}
