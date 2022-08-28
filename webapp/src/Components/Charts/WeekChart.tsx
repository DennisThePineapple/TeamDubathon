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
    vehiclePosition: VehiclePosition[]
}

export function WeekChart(props: weekChartProps) {
    const rawData = props.vehiclePosition;
    const parsedData: any = {};

    labels.forEach(day => {
        parsedData[day] = [];
    })

    rawData.forEach(vehiclePosition => {
        const day = (Math.floor(vehiclePosition.time / 86400 / 1000)) % 7
        parsedData[labels[day]].push(vehiclePosition.delay)
    })

    const getAvg = (arr: number[]): number => {
        let sum = 0;
        let total = 0;
        arr.forEach(el => {
            sum += el;
            total++;
        });
        return sum/total;
    }
    const data = {
        labels,
        datasets: [
            {
                label: 'Daily Delay',
                data: labels.map((day) => getAvg(parsedData[day])),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    return <Line options={options} data={data} />;
}