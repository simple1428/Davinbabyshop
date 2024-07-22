import React from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Header() {
    return (
        <header className="sticky top-0 bg-white z-50">
            <nav className="flex justify-between items-center h-[60px] shadow-xl px-5">
                <div>
                    <img
                        src={`${asset}logo/logo.png`}
                        alt="davinbabyshop"
                        className="w-44"
                    />
                </div>
                <div>
                    <FaUserCircle size={24} />
                </div>
            </nav>
        </header>
    );
}
