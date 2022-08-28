import React, {useEffect, useState} from "react";
import Stop from "../../Types/Stop";
import Route from "../../Types/Route";
import VehiclePosition from "../../Types/VehiclePosition";
import API from "../../Api/API";
import {WeekChart} from "./WeekChart";
import {Typography} from "@material-ui/core";
import {FakeWeekChart} from "./FakeWeekChart";

type chartContainerProps = {
    stops: Stop[],
    route: Route,
    selectedStop: Stop,
}

export default function ChartContainer(props: chartContainerProps) {
    const [vehiclePositions, setVehiclePositions] = useState<VehiclePosition[]>()
    const [allVehiclePositions, setAllVehiclePositions] = useState<VehiclePosition[]>()


    useEffect(() => {
        API.getVehiclePositionsForRouteStop(props.route.route_id, props.selectedStop.stop_id).then(
            res => {
                setVehiclePositions(res)
            }
        )
        API.getVehiclePositionsForRoute(props.route.route_id).then(res => {
                setAllVehiclePositions(res)
        })
    }, [props.selectedStop])

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
        if (props.route.route_id === "FAKEROUTE") {
            return (
                <div className = "chart-container">
                    <div className = "chart">
                        <Typography>
                            Average Delay For this Stop: 120
                        </Typography>
                        <FakeWeekChart delay={126.64}/>
                    </div>

                    <div className = "chart">
                        <Typography>
                            Average Delay For this Route: 200
                        </Typography>
                        <FakeWeekChart delay={202.578}/>
                    </div>
                </div>
            )
        }
        if (vehiclePositions && allVehiclePositions) {
            return (
                <div className = "chart-container">
                    <div className = "chart">
                        <Typography>
                            Average Delay For this Stop: {getAvg(vehiclePositions.map(p => p.delay))}
                        </Typography>
                        <WeekChart vehiclePosition={vehiclePositions}/>
                    </div>

                    <div className = "chart">
                        <Typography>
                            Average Delay For this Route: {getAvg(allVehiclePositions.map(p => p.delay))}
                        </Typography>
                        <WeekChart vehiclePosition={allVehiclePositions}/>
                    </div>
                </div>
            )
        }
    }

    return (

        <div>
            {renderCharts()}
        </div>
    )
}