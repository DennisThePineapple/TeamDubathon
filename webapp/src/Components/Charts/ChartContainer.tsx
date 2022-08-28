import React, {useEffect, useState} from "react";
import Stop from "../../Types/Stop";
import Route from "../../Types/Route";
import VehiclePosition from "../../Types/VehiclePosition";
import API from "../../Api/API";
import StopTime from "../../Types/StopTime";
import {WeekChart} from "./WeekChart";
import {Typography} from "@material-ui/core";

type chartContainerProps = {
    stops: Stop[],
    route: Route,
    selectedStop: Stop,
}

export default function ChartContainer(props: chartContainerProps) {
    const [vehiclePositions, setVehiclePositions] = useState<VehiclePosition[]>()
    const [stopTimes, setStopTimes] = useState<StopTime[]>()


    const data = stopTimes ? stopTimes.map(stopTime => stopTime.arrival_time) : []

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

    const getAvg = (arr: number[]): number => {
        let sum = 0;
        let total = 0;
        arr.forEach(el => {
            sum += el;
            total++;
        });
        return sum/total;
    }

    const renderCharts = () => {
        if (vehiclePositions) {
            return (
                <div>
                    <Typography>
                        Average Delay For this Stop: {getAvg(vehiclePositions.map(p => p.delay))}
                    </Typography>
                    <WeekChart vehiclePosition={vehiclePositions}/>
                </div>
            )
        }
    }

    return (

        <div className="chart-container">
            {renderCharts()}
        </div>
    )
}