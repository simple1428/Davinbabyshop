import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChart = ({ data, title, formatCurrency }) => {
    const chartData = {
        labels: data.map((item) => item.label),
        datasets: [
            {
                label: title,
                data: data.map((item) => item.value),
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <h2 className="text-md font-bold">{title}</h2>
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: "top",
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    // Format the value as currency
                                    const formattedValue = formatCurrency(
                                        context.raw
                                    );
                                    return `${context.dataset.label}: ${formattedValue}`;
                                },
                            },
                        },
                    },
                }}
            />
        </div>
    );
};

export default BarChart;
