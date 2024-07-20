import React, { useState } from "react";
import HomeLayout from "@/Layouts/HomeLayout";
import { Head, usePage } from "@inertiajs/react";

export default function Index() {
    const { categories, products } = usePage().props;
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const item = prevItems.find((item) => item.id === product.id);
            if (item) {
                return prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.id !== productId)
        );
    };

    const increaseQuantity = (productId) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const decreaseQuantity = (productId) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === productId
                    ? {
                          ...item,
                          quantity: item.quantity > 1 ? item.quantity - 1 : 1,
                      }
                    : item
            )
        );
    };
    return (
        <>
            <Head title="Aplikasi Point Of Sale" />
            <HomeLayout>
                <div className="p-4 ml-32 min-h-screen ">
                    <div className="flex justify-between items-center mb-4">
                        <input
                            type="text"
                            placeholder="Search Product ..."
                            className="border p-2 rounded-md w-full max-w-xs border-primary"
                        />
                        <span className="ml-4 text-primary ">
                            Result : {products.length}
                        </span>
                    </div>
                    <div className="flex gap-2 mb-4 overflow-x-auto whitespace-nowrap product-grid">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                className="border rounded-full text-sm px-4 py-2 bg-white shadow-sm"
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-5  ">
                        <div className="flex-1 grid grid-cols-4 gap-4 max-h-[1000px]   overflow-scroll product-grid pb-10 ">
                            {products.map((product) => (
                                <div
                                    onClick={() => addToCart(product)}
                                    key={product.id}
                                    className="  rounded-md p-4 flex flex-col items-center bg-white shadow-xl h-44 cursor-pointer hover:scale-110 transition-all duration-300 "
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-20 h-20 bg-gray-300 rounded-full mb-2"
                                    />
                                    <h3 className="font-bold text-gray-800">
                                        {product.name}
                                    </h3>
                                    <p className="text-gray-600">
                                        Rp.{product.price}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="w-1/3 border-l p-4 bg-white flex flex-col justify-between h-full">
                            <ul className="flex flex-col gap-2 mb-4">
                                {cartItems.map((item) => (
                                    <li
                                        key={item.id}
                                        className="flex justify-between items-center border p-2 rounded-md bg-white shadow-sm"
                                    >
                                        <span>{item.name}</span>
                                        <span>Rp.{item.price}</span>
                                        <div className="flex items-center">
                                            <button
                                                className="bg-secondary text-white px-2 py-1 rounded-md"
                                                onClick={() =>
                                                    decreaseQuantity(item.id)
                                                }
                                            >
                                                -
                                            </button>
                                            <span className="mx-2">
                                                {item.quantity}
                                            </span>
                                            <button
                                                className="bg-secondary text-white px-2 py-1 rounded-md"
                                                onClick={() =>
                                                    increaseQuantity(item.id)
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            className="text-primary"
                                            onClick={() =>
                                                removeFromCart(item.id)
                                            }
                                        >
                                            ×
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <div className="border-t pt-2">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>Rp.xxx</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg mt-2">
                                    <span>Total</span>
                                    <span>Rp.xxx</span>
                                </div>
                            </div>
                            <div className="flex justify-between mt-4">
                                <button className="bg-primary text-white rounded-md px-4 py-2">
                                    Simpan
                                </button>
                                <button className="bg-green-500 text-white rounded-md px-4 py-2">
                                    CheckOut
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </HomeLayout>
        </>
    );
}
