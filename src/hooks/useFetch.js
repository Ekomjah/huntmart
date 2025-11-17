import { ref, get } from "firebase/database";
import { db } from "../services/firebase/firebase";
import { useQuery } from "@tanstack/react-query";

async function fetchProducts() {
  const snapshot = await get(ref(db, "products"));
  return snapshot.val(); // returns the whole products object
}

export function useFetch() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["huntbasket"],
    queryFn: fetchProducts,
  });
  return { data, isLoading, isError, refetch };
}
