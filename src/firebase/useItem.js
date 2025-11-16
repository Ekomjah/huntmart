import { api } from "./client";
import { useQuery } from "@tanstack/react-query";

async function getItem({ queryKey }) {
  const [_key, id] = queryKey;
  const res = await api.get(`/${id}.json`);
   if (res.status !== 200) {
     throw new Error("Failed to fetch item");
   }

   if (res.data === null) {
     throw new Error(`Item with ID ${id} not found`);
   }
  console.log("data from axios", res.data);
  return res.data;
}

export function useItem(id) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: getItem,
  });
  return { data, isLoading, isError };
}
