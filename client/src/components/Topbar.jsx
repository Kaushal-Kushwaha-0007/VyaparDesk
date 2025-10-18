import React from "react";
import { Search, Bell } from "lucide-react";
import Logo from "../assets/company_logo.svg";
import { Link } from "react-router-dom";

export default function Topbar() {
    const user = {
        name: localStorage.getItem("username") || "Sahil Kumar",
        avatar: "https://ui-avatars.com/api/?name=SK&background=3b38a0&color=fff",
    };

    return (

        <div className="w-full fixed  bg-white shadow-sm px-6 py-3 flex items-center justify-between ">

            <div className=" font-bold">
                <Link to={"/dashboard"}><img src={Logo} alt="Vyapar Logo" className="  w-50 object-cover" /></Link>
            </div>


            {/* Right side: notifications + user */}
            <div className="flex items-center gap-6">
                <button className="relative text-[#3b38a0] hover:text-[#2e2a80]">
                    <Bell size={20} />
                    {/* Example notification dot */}
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* User info */}
                <div className="flex items-center gap-3">
                    <span className="text-gray-700 font-medium">{user.name}</span>
                    <img
                        src={user.avatar}
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full border"
                    />
                </div>
            </div>
        </div>
    );
}
