import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

export default function MainLayout() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="my-20">
        <Outlet />
      </main>
      <BottomNav />
    </>
  );
}
