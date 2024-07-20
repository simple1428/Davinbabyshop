import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdHomeMax } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { TbFileReport } from "react-icons/tb";
import { HiLogout } from "react-icons/hi";
import { MdOutlineSettings } from "react-icons/md";
export default function HomeLayout({ children }) {
    return (
        <div className="  w-full bg-background">
            <header className="sticky top-0 bg-white z-50">
                <nav className="flex justify-between items-center h-[60px] shadow-xl px-5">
                    <div className="">
                        <img
                            src={`${asset}logo/logo.png`}
                            alt="davinbabyshop"
                            className="w-44"
                        />
                    </div>
                    <div className="">
                        <FaUserCircle size={24} />
                    </div>
                </nav>
            </header>
            <div className="w-32 border h-screen fixed left-0 top-0 bg-white flex flex-col justify-between pt-20 items-center">
                <ul className="flex flex-col gap-5">
                    <li className="border border-primary bg-primary bg-opacity-10 rounded-md flex flex-col items-center py-2 px-3 text-textPrimary">
                        <MdHomeMax size={32} />
                        Home
                    </li>
                    <li className="border rounded-md flex flex-col items-center py-2 px-3 text-secondary">
                        <AiFillProduct size={32} />
                        Products
                    </li>
                    <li className="border rounded-md flex flex-col items-center py-2 px-3 text-secondary">
                        <TbFileReport size={32} />
                        Report
                    </li>
                    <li className="border rounded-md flex flex-col items-center py-2 px-3 text-secondary">
                        <MdOutlineSettings size={32} />
                        Report
                    </li>
                </ul>
                <div className="border-t   flex flex-col items-center py-2 px-3 text-white w-full bg-secondary ">
                    <HiLogout size={32} />
                </div>
            </div>
            <main className=" ">{children}</main>
        </div>
    );
}
