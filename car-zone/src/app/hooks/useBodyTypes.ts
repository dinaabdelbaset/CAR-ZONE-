import { useQuery } from "@tanstack/react-query";
import { API_HOST } from "../data/apiConfig";

export function useBodyTypes() {
  return useQuery({
    queryKey: ["bodyTypes"],
    queryFn: async () => {
      const res = await fetch(`${API_HOST}/body-types`);
      if (!res.ok) throw new Error("Failed to fetch body types");
      return res.json();
    },
  });
}
