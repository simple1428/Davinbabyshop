// resources/js/Components/SalesChart.jsx

import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
);

const SalesChart = ({ data }) => {
    const chartData = {
        labels: data.map((item) => item.date),
        datasets: [
            {
                label: "Sales",
                data: data.map((item) => item.sales),
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
        ],
    };

    return (
        <div>
            <h2>Sales Overview</h2>
            <Line data={chartData} />
        </div>
    );
};

export default SalesChart;
