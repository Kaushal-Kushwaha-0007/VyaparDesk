import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import Logo from "../assets/company_logo.svg";

// Heroicons
import { LockClosedIcon, EnvelopeIcon, EyeIcon } from "@heroicons/react/24/outline";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr("");
        try {
            const res = await login(email, password);
            localStorage.setItem("token", res.data.token);
            setTimeout(() => navigate("/dashboard"), 200);
        } catch (error) {
            setErr(error.response?.data?.msg || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            {/* Logo */}
            <div className="flex flex-col items-center mb-8">
                <img src={Logo} alt="Logo" className="h-12 mb-4" />
            </div>

            {/* Card */}
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-[#3b38a0] text-2xl font-bold flex items-center gap-2">
                    Welcome Back <LockClosedIcon className="h-6 w-6 text-[#3b38a0]" />
                </h1>
                <p className="text-gray-500 text-sm mt-1 mb-6">
                    Log in to manage your inventory
                </p>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="relative">
                        <EnvelopeIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-[#3b38a0]"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-[#3b38a0]"
                        />
                        <EyeIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 cursor-pointer" />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#3b38a0]  text-white py-2 rounded-md 
                       hover:bg-[#2e2a80] transition font-semibold"
                    >
                        Log In
                    </button>

                    {err && (
                        <p className="text-red-600 text-center text-sm mt-2">{err}</p>
                    )}
                </form>

                {/* Links */}
                <p className="mt-4 text-sm text-center text-gray-600">
                    Forgot Password?{" "}
                    <Link to="/forgot" className="text-[#3b38a0] hover:underline">
                        Reset
                    </Link>
                </p>

                <p className="mt-1 text-sm text-center text-gray-600">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-[#3b38a0] hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
