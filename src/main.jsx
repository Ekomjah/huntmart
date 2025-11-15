import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ContextProvider } from "./api/context/context";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router";
import routes from "./routes/routes.js";

const router = createBrowserRouter(routes);
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}>
      <QueryClientProvider client={queryClient}>
        <ContextProvider>
          <App />
        </ContextProvider>
      </QueryClientProvider>
    </RouterProvider>
  </StrictMode>
);
