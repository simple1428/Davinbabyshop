import React, { useState } from "react";
import HomeLayout from "@/Layouts/HomeLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import ProductList from "@/Components/HomeIndex/ProductList";
import Cart from "@/Components/HomeIndex/Cart";

export default function Index() {
    const { categories, products } = usePage().props;
    const [promoCode, setPromoCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const { data, setData, post } = useForm({ cartItems: [] });
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const addToCart = (product) => {
        const itemIndex = data.cartItems.findIndex(
            (item) => item.id === product.id
        );
        if (itemIndex !== -1) {
            setData(
                "cartItems",
                data.cartItems.map((item, index) =>
                    index === itemIndex
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            setData("cartItems", [
                ...data.cartItems,
                { ...product, quantity: 1 },
            ]);
        }
    };

    const removeFromCart = (productId) => {
        setData(
            "cartItems",
            data.cartItems.filter((item) => item.id !== productId)
        );
    };

    const increaseQuantity = (productId) => {
        const itemIndex = data.cartItems.findIndex(
            (item) => item.id === productId
        );
        if (itemIndex !== -1) {
            setData(
                "cartItems",
                data.cartItems.map((item, index) =>
                    index === itemIndex
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        }
    };

    const decreaseQuantity = (productId) => {
        const itemIndex = data.cartItems.findIndex(
            (item) => item.id === productId
        );
        if (itemIndex !== -1) {
            setData(
                "cartItems",
                data.cartItems.map((item, index) =>
                    index === itemIndex && item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
            );
        }
    };

    const calculateSubtotal = () => {
        return data.cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    };

    const calculateTotal = () => {
        return calculateSubtotal() * (1 - discount / 100);
    };

    const handleApplyPromoCode = () => {
        if (promoCode === "DISCOUNT10") {
            setDiscount(10);
            setErrorMessage("");
        } else if (promoCode === "DISCOUNT20") {
            setDiscount(20);
            setErrorMessage("");
        } else {
            setDiscount(0);
            setErrorMessage("Kode promo tidak valid");
        }
    };
    const handleCheckout = () => {
        post(route("transactions.store"), {
            onSuccess: (response) => {
                // Handle successful response here
                console.log("Checkout successful:", response);
                // Optionally redirect or show a success message
            },
            onError: (errors) => {
                // Handle errors here
                console.error("Checkout failed:", errors);
                // Optionally show an error message
            },
        });
    };

    const filteredProducts = products.filter(
        (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (selectedCategory ? product.category_id === selectedCategory : true)
    );
    const handleResetFilters = () => {
        setSearchQuery("");
        setSelectedCategory(null);
    };
    return (
        <>
            <Head title="Aplikasi Point Of Sale" />
            <HomeLayout>
                <div className=" ">
                    <div className="flex  justify-between   mb-4">
                        <div className="flex  flex-col   gap-2">
                            <input
                                type="text"
                                placeholder="Search Product ..."
                                className="border p-2 rounded-md w-full max-w-xs border-primary"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <span className="  text-xs text-primary">
                                Result : {filteredProducts.length}
                            </span>
                        </div>
                        <span
                            onClick={handleResetFilters}
                            className="  cursor-pointer text-primary px-1 py-0.5 rounded-lg"
                        >
                            Reset
                        </span>
                    </div>
                    <div className="flex gap-2 mb-4 py-2 overflow-x-auto whitespace-nowrap product-grid px-2">
                        {categories.map((category) => (
                            <span
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`cursor-pointer shadow-lg rounded-full text-sm px-4 py-2 transition-all duration-300  ${
                                    selectedCategory === category.id
                                        ? "bg-primary text-white scale-105"
                                        : "bg-white scale-90 hover:scale-100"
                                }`}
                            >
                                {category.name}
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-5 justify-between flex-grow">
                        <ProductList
                            products={filteredProducts}
                            addToCart={addToCart}
                        />
                        <Cart
                            cartItems={data.cartItems}
                            increaseQuantity={increaseQuantity}
                            decreaseQuantity={decreaseQuantity}
                            removeFromCart={removeFromCart}
                            calculateSubtotal={calculateSubtotal}
                            calculateTotal={calculateTotal}
                            promoCode={promoCode}
                            setPromoCode={setPromoCode}
                            handleApplyPromoCode={handleApplyPromoCode}
                            discount={discount}
                            errorMessage={errorMessage}
                            handleCheckout={handleCheckout}
                        />
                    </div>
                </div>
            </HomeLayout>
        </>
    );
}
