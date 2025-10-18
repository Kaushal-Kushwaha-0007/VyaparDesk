import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import ListProduct from "./pages/ListProduct";
import Staffs from "./pages/Staffs";
import Layout from "./components/Layout";

export default function Router() {
    const location = useLocation();
    const isAuthenticated = !!localStorage.getItem("token");

    return (
        <Routes location={location}>
            {/* Public routes */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes with Layout */}
            {isAuthenticated ? (
                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/add-product" element={<AddProduct />} />
                    <Route path="/products" element={<ListProduct />} />
                    <Route path="/staffs" element={<Staffs />} />
                </Route>
            ) : (
                <Route path="*" element={<Navigate to="/" />} />
            )}
        </Routes>
    );
}
