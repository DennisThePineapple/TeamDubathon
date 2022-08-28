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
        </div>
    )
}