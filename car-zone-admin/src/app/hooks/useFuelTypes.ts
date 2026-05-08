import { useQuery } from "@tanstack/react-query";
import { API_HOST } from "../data/apiConfig";

export function useFuelTypes() {
  return useQuery({
    queryKey: ["fuelTypes"],
    queryFn: async () => {
      const res = await fetch(`${API_HOST}/fuel-types`);
      if (!res.ok) throw new Error("Failed to fetch fuel types");
      return await res.json();
    },
  });
}
