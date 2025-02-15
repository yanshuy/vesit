import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

export default function MainLayout() {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className="my-24 px-4">
                <Outlet />
            </main>
            <BottomNav />
        </>
    );
}
