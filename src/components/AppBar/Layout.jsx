import { Outlet } from "react-router";
import PrimarySearchAppBar from "@/components/AppBar/Appbar";
import Box from "@mui/material/Box";
import { update } from "@/hooks/updateFavicon";
import { useEffect } from "react";
import { useThemeContext } from "@/context/useThemeContext";

export default function AppLayout() {
  const { theme } = useThemeContext();

  useEffect(() => {
    update();
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", update);
  }, []);

  return (
    <>
      <PrimarySearchAppBar />
      <Box
        sx={{
          pt: 10,
          backgroundColor:
            theme === "light" ? "var(--hunt-bg)" : "var(--hunt-bg)",
          color: theme === "light" ? "var(--hunt-text)" : "var(--hunt-text)",
          transition: "background-color 0.3s ease, color 0.3s ease",
        }}
      >
        <Outlet />
      </Box>
    </>
  );
}
