import React from "react";
import { Link, useLocation } from "react-router-dom";



import {
    Home,
    PlusCircle,
    List,
    Users,
    LogOut,
} from "lucide-react";

const links = [
    { name: "Dashboard", path: "/dashboard", icon: <Home size={20} /> },
    { name: "Add Product", path: "/add-product", icon: <PlusCircle size={20} /> },
    { name: "List Product", path: "/products", icon: <List size={20} /> },
    { name: "Staffs", path: "/staffs", icon: <Users size={20} /> },
];

export default function Navbar({ children }) {
    const location = useLocation();

    return (
        <div className="fixed top-16 left-0 min-h-[calc(100vh-4rem)] bg-white flex">
            <nav className="w-60  flex flex-col">

                <ul className="flex-1">
                    {links.map(({ name, path, icon }) => (
                        <li key={name}>
                            <Link
                                to={path}
                                className={`flex items-center gap-3 p-4 hover:bg-gray-200 transition ${location.pathname === path ? "bg-gray-200" : ""
                                    }`}
                            >
                                {icon}
                                <span>{name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="p-4 border-t bg-[#3b38a0]">
                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            window.location.href = "/";
                        }}
                        className="flex items-center  text-white gap-2 w-full hover:bg-[#2e2a80]"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </nav>
            <main className="flex-1 bg-gray-200 p-6 overflow-auto">{children}</main>
        </div>
    );
}
