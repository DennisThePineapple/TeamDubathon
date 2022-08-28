import React from 'react';
import { Line } from 'react-chartjs-2';
import VehiclePosition from "../../Types/VehiclePosition";



export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Daily Average Delay',
        },
    },
};

const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

type weekChartProps = {
    delay: number
}

export function FakeWeekChart(props: weekChartProps) {

    function getRandomInt() {
        return Math.floor(Math.random() * 50 - 25);
    }

    const data = {
        labels,
        datasets: [
            {
                label: 'Daily Delay',
                data: labels.map((day) => props.delay + getRandomInt()),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    return <Line options={options} data={data} />;
}