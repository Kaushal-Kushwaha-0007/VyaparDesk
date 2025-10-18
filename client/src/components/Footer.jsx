// src/components/Feedback.jsx
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Feedback() {
    return (
        <div className="flex items-center justify-between px-6 py-3  bg-white text-sm text-gray-600">
            {/* Left side links */}
            <div className="flex space-x-6">
                <a href="#" className="hover:text-[#2e2a80] transition">Resources</a>
                <a href="#" className="hover:text-[#2e2a80] transition">Legal</a>
                <a href="#" className="hover:text-[#2e2a80] transition">Contact Us</a>
            </div>

            {/* Right side social icons */}
            <div className="flex space-x-4">
                <a href="#" className="hover:text-[#2e2a80] transition">
                    <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="hover:text-[#2e2a80] transition">
                    <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="hover:text-[#2e2a80] transition">
                    <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="hover:text-[#2e2a80] transition">
                    <Linkedin className="w-4 h-4" />
                </a>
            </div>
        </div>
    );
}
