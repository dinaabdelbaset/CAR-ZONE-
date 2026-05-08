import { useQuery } from "@tanstack/react-query";
import { API_HOST } from "../data/apiConfig";

export function useTransmissions() {
  return useQuery({
    queryKey: ["transmissions"],
    queryFn: async () => {
      const res = await fetch(`${API_HOST}/transmissions`);
      if (!res.ok) throw new Error("Failed to fetch transmissions");
      return await res.json();
    },
  });
}
