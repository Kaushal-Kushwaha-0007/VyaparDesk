// src/components/Layout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Topbar from "./Topbar";
import Footer from "./Footer"

export default function Layout() {
    return (
        <>
            <Topbar />
            <div className="flex">
                <Navbar />
                <main className="flex-1 bg-gray-200 min-h-screen p-25">
                    <Outlet />
                </main>

            </div>
        </>
    );
}
