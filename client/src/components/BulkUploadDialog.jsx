// BulkUploadDialog.jsx
import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

export default function BulkUploadDialog({ isOpen, onClose, onUploadSuccess }) {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError("");
        setSuccessMsg("");
    };

    const handleUpload = async () => {
        if (!file) {
            setError("Please select a file");
            return;
        }

        setLoading(true);
        setError("");
        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.append("file", file);

            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/products/bulk-upload`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setSuccessMsg(res.data.msg);
            setFile(null);
            onUploadSuccess(); // refresh products if needed
        } catch (err) {
            setError(err.response?.data?.msg || "Upload failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-900"
                >
                    <X size={20} />
                </button>
                <h2 className="text-xl font-bold mb-4">Bulk Upload Products</h2>

                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileChange}
                    className="border p-2 rounded w-full mb-4"
                />

                {error && <p className="text-red-600 mb-2">{error}</p>}
                {successMsg && <p className="text-green-600 mb-2">{successMsg}</p>}

                <button
                    onClick={handleUpload}
                    disabled={loading}
                    className="w-full bg-[#3b38a0] text-white py-2 rounded hover:bg-[#2e2a80] transition cursor-pointer"
                >
                    {loading ? "Uploading..." : "Upload"}
                </button>
            </div>
        </div>
    );
}
