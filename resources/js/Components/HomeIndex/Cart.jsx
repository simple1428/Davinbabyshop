import React from "react";

export default function Cart({
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    calculateSubtotal,
    handleCheckout,
    calculateTotal,
    promoCode,
    setPromoCode,
    handleApplyPromoCode,
    discount,
    errorMessage,
}) {
    return (
        <div className="w-1/3 border-l p-4 bg-white flex flex-col justify-between h-fit sticky top-16">
            <ul className="flex flex-col gap-2 mb-4 max-h-[550px] overflow-scroll product-grid">
                {cartItems.map((item) => (
                    <li
                        key={item.id}
                        className="flex justify-between items-center border p-2 rounded-md bg-white shadow-sm transition-all duration-300 hover:scale-105 hover:bg-primary/15 cursor-pointer"
                    >
                        <div>
                            <p className="text-xs">{item.name}</p>
                            <span className="text-xs font-bold text-primary">
                                Rp.{item.price}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center">
                                <button
                                    className="bg-secondary text-white px-1 py-0.5 rounded-md"
                                    onClick={() => decreaseQuantity(item.id)}
                                >
                                    -
                                </button>
                                <span className="mx-2 text-xs">
                                    {item.quantity}
                                </span>
                                <button
                                    className="bg-secondary text-white px-1 py-0.5 rounded-md"
                                    onClick={() => increaseQuantity(item.id)}
                                >
                                    +
                                </button>
                            </div>
                            <button
                                className="text-primary"
                                onClick={() => removeFromCart(item.id)}
                            >
                                ×
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <div>
                <div className="border-t pt-2">
                    <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>Rp.{calculateSubtotal().toLocaleString()}</span>
                    </div>
                    {/* <div className="flex justify-between text-sm mt-2">
                        <input
                            type="text"
                            placeholder="Masukkan Kode Promo"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="border p-2 rounded-md w-full max-w-xs border-primary"
                        />
                        <button
                            className="bg-primary text-white rounded-md px-4 py-2 ml-2"
                            onClick={handleApplyPromoCode}
                        >
                            Terapkan
                        </button>
                    </div>
                    {errorMessage && (
                        <div className="text-red-500 text-sm mt-2">
                            {errorMessage}
                        </div>
                    )}
                    <div className="flex justify-between text-sm mt-2">
                        <span>Diskon</span>
                        <span>
                            Rp.
                            {(
                                calculateSubtotal() *
                                (discount / 100)
                            ).toLocaleString()}
                        </span>
                    </div>*/}
                    <div className="flex justify-between font-bold text-lg mt-2">
                        <span>Total</span>
                        <span>Rp.{calculateTotal().toLocaleString()}</span>
                    </div>
                </div>
                <div className="flex justify-between mt-4 text-sm gap-2">
                    <button className="bg-primary text-white rounded-md px-4 py-2">
                        Simpan
                    </button>
                    <button
                        onClick={handleCheckout}
                        className="bg-green-500 text-white rounded-md px-4 py-2"
                    >
                        CheckOut
                    </button>
                </div>
            </div>
        </div>
    );
}
