import { ref, get } from "firebase/database";
import { db } from "../services/firebase/firebase";
import { useQuery } from "@tanstack/react-query";

async function fetchProducts() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);
  try {
    const snapshot = await get(ref(db, "products"), {
      signal: controller.signal,
    });
    return snapshot.val();
  } finally {
    clearTimeout(timeoutId);
  }
}

export function useFetch() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["huntbasket"],
    queryFn: fetchProducts,
    retry: 1,
  });
  return { data, isLoading, isError, refetch };
}
