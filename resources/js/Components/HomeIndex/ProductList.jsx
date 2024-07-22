import React from "react";

export default function ProductList({ products, addToCart }) {
    return (
        <div className="flex-1 grid grid-cols-4 gap-4 max-h-[1000px] overflow-scroll product-grid pb-10 h-fit">
            {products.map((product) => (
                <div
                    onClick={() => addToCart(product)}
                    key={product.id}
                    className="rounded-md flex flex-col items-center bg-white shadow-xl h-44 cursor-pointer hover:scale-110 transition-all duration-300"
                >
                    <div className="p-2 border-b">
                        <img
                            src={`${asset}logo/logo.png`}
                            alt={product.name}
                            className="w-20 h-20 bg-gray-300 rounded-full mb-2"
                        />
                    </div>
                    <div className="w-full flex flex-col justify-between items-center h-full pb-2">
                        <h3 className="text-center font-bold text-xs text-gray-800">
                            {product.name}
                        </h3>
                        <p className="text-primary text-xs font-bold border-b border-primary">
                            Rp.{product.price}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
