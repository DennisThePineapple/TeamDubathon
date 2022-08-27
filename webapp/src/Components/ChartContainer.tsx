import React, {useEffect, useState} from "react";
import Stop from "../Types/Stop";
import Route from "../Types/Route";
import VehiclePosition from "../Types/VehiclePosition";
import API from "../Api/API";

type chartContainerProps = {
    stops: Stop[],
    route: Route,
    selectedStop: Stop,
}

export default function ChartContainer(props: chartContainerProps) {
    const [vehiclePositions, setVehiclePositions] = useState<VehiclePosition[]>()

    useEffect(() => {
        API.getVehiclePositionsForRouteStop(props.route.route_id, props.selectedStop.stop_id).then(
            res => setVehiclePositions(res)
        )
    }, [])

    console.log(vehiclePositions)
    return(
        <div className="app-container">
        </div>
    )
}