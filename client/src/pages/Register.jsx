import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import Logo from "../assets/company_logo.svg";


import { UserIcon, BuildingStorefrontIcon, EnvelopeIcon, PhoneIcon, LockClosedIcon, EyeIcon } from "@heroicons/react/24/outline";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        businessName: "",
        email: "",
        phone: "",
        password: "",
        confirm: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr("");
        if (form.password !== form.confirm) {
            setErr("Passwords do not match");
            return;
        }
        try {
            await register({
                name: form.name,
                businessName: form.businessName,
                email: form.email,
                phone: form.phone,
                password: form.password,
            });
            navigate("/");
        } catch (error) {
            setErr(error.response?.data?.msg || "Registration failed");
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
                    Register Your Business <BuildingStorefrontIcon className="h-6 w-6 text-[#3b38a0]" />
                </h1>
                <p className="text-gray-500 text-sm mt-1 mb-6">
                    Create an account to start managing your inventory
                </p>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="relative">
                        <UserIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <input
                            name="name"
                            placeholder="Name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3b38a0]"
                        />
                    </div>

                    {/* Business Name */}
                    <div className="relative">
                        <BuildingStorefrontIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <input
                            name="businessName"
                            placeholder="Business Name"
                            value={form.businessName}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3b38a0]"
                        />
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <EnvelopeIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3b38a0]"
                        />
                    </div>

                    {/* Phone */}
                    <div className="relative">
                        <PhoneIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <input
                            name="phone"
                            placeholder="Phone"
                            value={form.phone}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3b38a0]"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3b38a0]"
                        />
                        <EyeIcon
                            className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <input
                            name="confirm"
                            type={showConfirm ? "text" : "password"}
                            placeholder="Confirm password"
                            value={form.confirm}
                            onChange={handleChange}
                            required
                            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3b38a0]"
                        />
                        <EyeIcon
                            className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 cursor-pointer"
                            onClick={() => setShowConfirm(!showConfirm)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#3b38a0] text-white py-2 rounded-md hover:bg-[#2e2a80] transition font-semibold"
                    >
                        Register
                    </button>

                    {err && <p className="text-red-600 text-center text-sm mt-2">{err}</p>}
                </form>

                <p className="mt-4 text-sm text-center text-gray-600">
                    Already have an account?{" "}
                    <Link to="/" className="text-[#3b38a0] hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
