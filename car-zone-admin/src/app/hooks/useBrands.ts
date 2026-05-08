import { useQuery } from "@tanstack/react-query";
import { API_HOST } from "../data/apiConfig";

export function useBrands() {
  return useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const res = await fetch(`${API_HOST}/brands`);
      if (!res.ok) throw new Error("Failed to fetch brands");
      return await res.json();
    },
  });
}
