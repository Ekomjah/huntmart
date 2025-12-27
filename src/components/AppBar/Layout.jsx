import { Outlet } from "react-router";
import PrimarySearchAppBar from "@/components/AppBar/Appbar";
import Box from "@mui/material/Box";

export default function AppLayout() {
  return (
    <>
      <PrimarySearchAppBar />
      <Box sx={{ pt: 10 }}>
        <Outlet />
      </Box>
    </>
  );
}
