import React, { useState, useEffect } from "react";
import { addProduct, updateProduct } from "../api/products";
import { Package, Tag, DollarSign, Hash, FileText, Upload } from "lucide-react";
import BulkUploadDialog from "../components/BulkUploadDialog";

export default function AddProduct({ existingProduct, onClose, isEdit }) {
    const [form, setForm] = useState({
        name: "",
        category: "",
        price: "",
        cost: "",
        brand: "",
        description: "",
        quantity: "",
    });
    const [err, setErr] = useState("");

    useEffect(() => {
        if (isEdit && existingProduct) {
            setForm({
                name: existingProduct.name || "",
                category: existingProduct.category || "",
                price: existingProduct.price?.toString() || "",
                cost: existingProduct.cost?.toString() || "",
                brand: existingProduct.brand || "",
                description: existingProduct.description || "",
                quantity: existingProduct.quantity?.toString() || "",
            });
        }
    }, [existingProduct, isEdit]);


    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr("");
        const token = localStorage.getItem("token");

        try {
            const payload = {
                ...form,
                price: Number(form.price),
                cost: Number(form.cost),
                quantity: Number(form.quantity),
            };

            if (isEdit) {
                await updateProduct(existingProduct._id, payload, token);
            } else {
                await addProduct(payload, token);
            }

            if (onClose) onClose();
        } catch (error) {
            setErr(error.response?.data?.msg || "Failed to save product");
        }
    };

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleUploadSuccess = () => {
        console.log("Upload successful");
    };


    return (
        <div className="ml-50 w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
            <h1 className="text-2xl font-bold text-[#3b38a0] mb-1">
                {isEdit ? "Edit Product" : "Add New Product"}
            </h1>
            <p className="text-gray-500 mb-6">
                {isEdit ? "Modify product details below" : "Enter product details below"}
            </p>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                {/* Product Name */}
                <div className="md:col-span-2 relative">
                    <Package className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Product Name *"
                        required
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e2a80] focus:outline-none"
                    />
                </div>

                {/* Category */}
                <div className="md:col-span-2 relative">
                    <Tag className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e2a80] focus:outline-none"
                    >
                        <option value="">Select Category *</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Grocery">Grocery</option>
                        <option value="Fresh">Fresh</option>
                        <option value="Stationary">Stationary</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                {/* Price */}
                <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                        name="price"
                        type="number"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="Price *"
                        required
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e2a80] focus:outline-none"
                    />
                </div>

                {/* Quantity */}
                <div className="relative">
                    <Hash className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                        name="quantity"
                        type="number"
                        value={form.quantity}
                        onChange={handleChange}
                        placeholder="Quantity *"
                        required
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e2a80] focus:outline-none"
                    />
                </div>

                {/* Cost */}
                <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                        name="cost"
                        type="number"
                        value={form.cost}
                        onChange={handleChange}
                        placeholder="Cost *"
                        required
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e2a80] focus:outline-none"
                    />
                </div>

                {/* Brand */}
                <div className="relative">
                    <Tag className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                        name="brand"
                        value={form.brand}
                        onChange={handleChange}
                        placeholder="Brand *"
                        required
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e2a80] focus:outline-none"
                    />
                </div>

                {/* Description */}
                <div className="md:col-span-2 relative">
                    <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Description"
                        rows={3}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e2a80] focus:outline-none"
                    />
                </div>

                {/* Error */}
                {err && <p className="md:col-span-2 text-red-600">{err}</p>}

                {/* Actions */}
                <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                    {onClose && (
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        className="px-6 py-2 bg-[#3b38a0] text-white rounded-lg hover:bg-[#2e2a80] transition"
                    >
                        {isEdit ? "Save Changes" : "Add Product"}
                    </button>
                </div>
            </form>
            <button
                onClick={() => setIsDialogOpen(true)}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2 cursor-pointer"
            >
                <Upload size={16} /> Bulk Upload
            </button>

            {/* Dialog */}
            <BulkUploadDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onUploadSuccess={handleUploadSuccess}
            />
        </div>
    );
}
