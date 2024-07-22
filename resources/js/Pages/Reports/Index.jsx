import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import HomeLayout from "@/Layouts/HomeLayout";
import BarChart from "@/Components/BarChart";
import PieChart from "@/Components/PieChart";

export default function Index({
    totalSales,
    topProducts,
    salesByCategory,
    startDate,
    endDate,
}) {
    const [dateRange, setDateRange] = useState({
        start_date: startDate,
        end_date: endDate,
    });

    const handleDateChange = (e) => {
        setDateRange({ ...dateRange, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Fetch data based on date range (in a real application, you'd send a request to the server)
    };

    // Format data for charts
    const formatData = (data) => {
        return data.map((item) => ({
            label: item.name || item.category_name, // Adjust according to your data
            value: item.total_quantity || item.total_sales || item.total_amount, // Adjust according to your data
        }));
    };

    const formatCurrency = (value) => {
        return value.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
        });
    };

    const formattedSalesByCategory = formatData(salesByCategory);
    const formattedTopProducts = formatData(topProducts);

    return (
        <>
            <Head title="Analytics & Reporting" />
            <HomeLayout>
                <div className="p-6 bg-gray-100 min-h-screen">
                    <h1 className="text-2xl font-bold mb-6">
                        Analytics & Reporting
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className="mb-8 bg-white p-4 rounded shadow-md flex gap-4 items-center"
                    >
                        <div>
                            <label className="block text-sm font-semibold mb-1">
                                Start Date:
                            </label>
                            <input
                                type="date"
                                name="start_date"
                                value={dateRange.start_date}
                                onChange={handleDateChange}
                                className="border rounded p-2 w-48"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-1">
                                End Date:
                            </label>
                            <input
                                type="date"
                                name="end_date"
                                value={dateRange.end_date}
                                onChange={handleDateChange}
                                className="border rounded p-2 w-48"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-primary text-white p-2 rounded hover:bg-opacity-80 transition"
                        >
                            Filter
                        </button>
                    </form>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white p-4 rounded shadow-md">
                            <h2 className="text-xl font-semibold mb-4">
                                Sales by Category
                            </h2>
                            <BarChart
                                data={formattedSalesByCategory}
                                title="Sales by Category"
                                formatCurrency={formatCurrency}
                            />
                        </div>
                        <div className="bg-white p-4 rounded shadow-md">
                            <h2 className="text-xl font-semibold mb-4">
                                Top Selling Products
                            </h2>
                            <PieChart
                                data={formattedTopProducts}
                                title="Top Selling Products"
                                formatCurrency={formatCurrency}
                            />
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded shadow-md">
                        <h2 className="text-xl font-semibold mb-4">
                            Total Sales
                        </h2>
                        <p className="text-2xl font-bold">
                            {formatCurrency(totalSales)}
                        </p>
                    </div>
                </div>
            </HomeLayout>
        </>
    );
}
