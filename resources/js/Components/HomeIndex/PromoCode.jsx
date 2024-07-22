import React from "react";

export default function PromoCode({
    promoCode,
    setPromoCode,
    handleApplyPromoCode,
    errorMessage,
}) {
    return (
        <div className="flex justify-between text-sm mt-2">
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
            {errorMessage && (
                <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
            )}
        </div>
    );
}
