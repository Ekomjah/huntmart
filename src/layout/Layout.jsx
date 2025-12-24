import { Outlet } from "react-router";
import PrimarySearchAppBar from "@/components/AppBar/Appbar";

export default function AppLayout() {
  return (
    <>
      <PrimarySearchAppBar />
      <Outlet />
    </>
  );
}