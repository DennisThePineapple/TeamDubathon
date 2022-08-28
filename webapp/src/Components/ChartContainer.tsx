import React, {useEffect, useState} from "react";
import Stop from "../Types/Stop";
import Route from "../Types/Route";
import VehiclePosition from "../Types/VehiclePosition";
import API from "../Api/API";
import StopTime from "../Types/StopTime";

type chartContainerProps = {
    stops: Stop[],
    route: Route,
    selectedStop: Stop,
}

export default function ChartContainer(props: chartContainerProps) {
    const [vehiclePositions, setVehiclePositions] = useState<VehiclePosition[]>()
    const [stopTimes, setStopTimes] = useState<StopTime[]>()


    // const initCanvas = () => {
    //     const preCtx = document.getElementById('myChart') as HTMLCanvasElement | null
    //     const ctx = preCtx?.getContext("myChart")!
    //     const data = {
    //         datasets: [{
    //             label: 'My First dataset',
    //             backgroundColor: 'rgb(255, 99, 132)',
    //             borderColor: 'rgb(255, 99, 132)',
    //             data: [0, 10, 5, 2, 20, 30, 45],
    //         }]
    //     };
    //     const myChart = new Chart(ctx, {
    //         type: 'bar',
    //         data: data,
    //     });
    //
    //     return <></>
    // }

    const data = stopTimes ? stopTimes.map(stopTime => stopTime.arrival_time) : []

    const Chart = require('chart.js');
    const myChart = new Chart("myChart", {
        type: "line",
        data: data,
        options: {
            layout: {
                padding: 20
            }
        }
    });

        useEffect(() => {
        API.getVehiclePositionsForRouteStop(props.route.route_id, props.selectedStop.stop_id).then(
            res => {
                setVehiclePositions(res)
                API.getStopTimesForRouteStop(res ? res.map(vehiclePosition => vehiclePosition.trip_id) : [""], props.selectedStop.stop_id).then(
                    res2 => setStopTimes(res2)
                )
            }
        )
    }, [])

    console.log(vehiclePositions)
    console.log(stopTimes)
    return(

        <div className="app-container">
            <canvas id="myChart">
            </canvas>
        </div>
    )
}