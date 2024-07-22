// resources/js/Components/Sidebar.jsx

import React from "react";
import { MdHomeMax } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { TbFileReport } from "react-icons/tb";
import { HiLogout } from "react-icons/hi";
import { MdOutlineSettings } from "react-icons/md";
import { usePage, Link } from "@inertiajs/react";

export default function Sidebar() {
    const { url, component } = usePage();
    const activeLink =
        "border border-primary bg-primary bg-opacity-10 rounded-md flex flex-col items-center py-2 px-3 text-textPrimary transition-all duration-300 text-sm";
    const inActiveLink =
        "border rounded-md flex flex-col items-center py-2 px-3 text-secondary transition-all duration-300 text-sm";

    return (
        <div className="w-32 border h-screen fixed left-0 top-0 bg-white flex flex-col justify-between pt-20 items-center">
            <div className="flex flex-col gap-5">
                <Link
                    href={route("home")}
                    className={
                        component === "Home/Index" ? activeLink : inActiveLink
                    }
                >
                    <MdHomeMax size={32} />
                    Home
                </Link>
                <Link
                    href={route("products.index")}
                    className={
                        url.startsWith("/products") ? activeLink : inActiveLink
                    }
                >
                    <AiFillProduct size={32} />
                    Products
                </Link>
                <Link
                    href={route("reports.index")}
                    className={
                        url.startsWith("/reports") ? activeLink : inActiveLink
                    }
                >
                    <TbFileReport size={32} />
                    Reports
                </Link>
                <Link className={inActiveLink}>
                    <MdOutlineSettings size={32} />
                    Settings
                </Link>
            </div>
            <div className="border-t flex flex-col items-center py-2 px-3 text-primary w-full">
                <HiLogout size={32} />
            </div>
        </div>
    );
}
