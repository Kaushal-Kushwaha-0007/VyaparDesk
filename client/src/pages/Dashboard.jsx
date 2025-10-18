import React, { useEffect, useState } from "react";
import { getProducts } from "../api/products";

import { Bar, Pie, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Dashboard() {
    const [products, setProducts] = useState([]);
    const [err, setErr] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await getProducts(token);
                setProducts(res.data);
            } catch (error) {
                setErr("Failed to load products");
            }
        };
        fetchProducts();
    }, []);


    const stockByCategory = products.reduce((acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + Number(p.quantity);
        return acc;
    }, {});
    const stockByBrand = products.reduce((acc, p) => {
        acc[p.brand] = (acc[p.brand] || 0) + Number(p.quantity);
        return acc;
    }, {});
    const lowStock = products.filter(p => p.quantity < 10).length;
    const sufficientStock = products.length - lowStock;
    const sortedByPrice = [...products].sort((a, b) => b.price - a.price);
    const top5Expensive = sortedByPrice.slice(0, 5);
    const top5Cheap = sortedByPrice.slice(-5);
    const inventoryValues = products.map(p => p.price * p.quantity);

    return (
        <div className="ml-70 w-5xl mx-auto p-6 bg-white rounded-lg shadow space-y-6">
            <h1 className="text-3xl font-bold text-[#3b38a0] mb-4">Smart Analytics Dashboard</h1>
            {err && <p className="text-red-600">{err}</p>}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">Stock by Category</h2>
                    <Bar
                        data={{
                            labels: Object.keys(stockByCategory),
                            datasets: [{
                                label: "Stock by Category",
                                data: Object.values(stockByCategory),
                                backgroundColor: "rgba(59, 56, 160, 0.7)"
                            }]
                        }}
                        options={{ responsive: true, plugins: { legend: { display: false } } }}
                    />
                </div>

                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">Stock by Brand</h2>
                    <Doughnut
                        data={{
                            labels: Object.keys(stockByBrand),
                            datasets: [{
                                label: "Stock by Brand",
                                data: Object.values(stockByBrand),
                                backgroundColor: ["#3b38a0", "#2e2a80", "#8c82ff", "#b8b3ff", "#5c5ae5"]
                            }]
                        }}
                        options={{ responsive: true }}
                    />
                </div>

                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">Low Stock vs Sufficient Stock</h2>
                    <Pie
                        data={{
                            labels: ["Low Stock", "Sufficient Stock"],
                            datasets: [{
                                data: [lowStock, sufficientStock],
                                backgroundColor: ["#f87171", "#34d399"]
                            }]
                        }}
                    />
                </div>

                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">Top 5 Expensive Products</h2>
                    <Bar
                        data={{
                            labels: top5Expensive.map(p => p.name),
                            datasets: [{
                                label: "Price ($)",
                                data: top5Expensive.map(p => p.price),
                                backgroundColor: "#fbbf24"
                            }]
                        }}
                        options={{ responsive: true }}
                    />
                </div>

                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">Top 5 Cheapest Products</h2>
                    <Bar
                        data={{
                            labels: top5Cheap.map(p => p.name),
                            datasets: [{
                                label: "Price ($)",
                                data: top5Cheap.map(p => p.price),
                                backgroundColor: "#34d399"
                            }]
                        }}
                        options={{ responsive: true }}
                    />
                </div>

                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">Inventory Value Distribution</h2>
                    <Bar
                        data={{
                            labels: products.map(p => p.name),
                            datasets: [{
                                label: "Inventory Value ($)",
                                data: inventoryValues,
                                backgroundColor: "#6366f1"
                            }]
                        }}
                        options={{ responsive: true, plugins: { legend: { display: false } } }}
                    />
                </div>
            </div>
        </div>
    );
}
