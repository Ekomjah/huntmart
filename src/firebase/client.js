import axios from "axios";

export const api = axios.create({
  baseURL: "https://e-commerce-app-hunt-default-rtdb.firebaseio.com/products",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
