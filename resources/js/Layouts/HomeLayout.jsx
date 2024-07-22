import React from "react";
import Header from "@/Components/Layout/Header";
import MainContent from "@/Components/Layout/MainContent";
import Sidebar from "@/Components/Layout/Sidebar";

export default function HomeLayout({ children }) {
    return (
        <div className="w-full bg-background min-h-screen">
            <Header />
            <Sidebar />
            <MainContent>{children}</MainContent>
        </div>
    );
}
