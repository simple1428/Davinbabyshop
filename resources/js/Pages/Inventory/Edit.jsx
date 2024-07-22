import React from "react";
import { useForm, Link, Head } from "@inertiajs/react";
import HomeLayout from "@/Layouts/HomeLayout";

export default function Edit({ inventory, products }) {
    const { data, setData, put, errors } = useForm({
        product_id: inventory.product_id,
        quantity: inventory.quantity,
        entry_date: inventory.entry_date,
        exit_date: inventory.exit_date,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("inventories.update", inventory.id));
    };

    return (
        <>
            <Head title="Edit Inventory" />
            <HomeLayout>
                <div className="p-4 ml-32">
                    <div className="bg-white shadow-xl rounded-lg p-6">
                        <h1 className="text-lg uppercase text-primary font-bold mb-5">
                            Edit Inventory
                        </h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Product
                                </label>
                                <select
                                    value={data.product_id}
                                    onChange={(e) =>
                                        setData("product_id", e.target.value)
                                    }
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm"
                                >
                                    {products.map((product) => (
                                        <option
                                            key={product.id}
                                            value={product.id}
                                        >
                                            {product.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.product_id && (
                                    <div className="text-red-500 text-sm">
                                        {errors.product_id}
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    value={data.quantity}
                                    onChange={(e) =>
                                        setData("quantity", e.target.value)
                                    }
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm"
                                />
                                {errors.quantity && (
                                    <div className="text-red-500 text-sm">
                                        {errors.quantity}
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Entry Date
                                </label>
                                <input
                                    type="date"
                                    value={data.entry_date}
                                    onChange={(e) =>
                                        setData("entry_date", e.target.value)
                                    }
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm"
                                />
                                {errors.entry_date && (
                                    <div className="text-red-500 text-sm">
                                        {errors.entry_date}
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Exit Date
                                </label>
                                <input
                                    type="date"
                                    value={data.exit_date}
                                    onChange={(e) =>
                                        setData("exit_date", e.target.value)
                                    }
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm"
                                />
                                {errors.exit_date && (
                                    <div className="text-red-500 text-sm">
                                        {errors.exit_date}
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end">
                                <Link
                                    href={route("inventory.index")}
                                    className="rounded-lg px-4 py-2 bg-gray-500 text-white text-sm mr-2"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    className="rounded-lg px-4 py-2 bg-primary text-white text-sm"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </HomeLayout>
        </>
    );
}
