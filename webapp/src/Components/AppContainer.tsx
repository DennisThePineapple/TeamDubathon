import React, {useEffect, useState} from "react";
import SearchContainer from "./Search/SearchContainer";
import ChartContainer from "./Charts/ChartContainer";
import Route from "../Types/Route";
import Stop from "../Types/Stop";
import {Button} from "@material-ui/core";

export default function AppContainer() {
    const [route, setRoute] = useState<Route | null>(null);
    const [stops, setStops] = useState<Stop[] | null>(null);
    const [selectedStop, setSelectedStop] = useState<Stop | null>(null);
    const [showCharts, setShowCharts] = useState<boolean>(false);

    const shouldAllowGenerateButton = () : boolean => {
        return !(route != null && stops != null && selectedStop != null)
    }

    const renderCharts = () => {
        if (route != null && stops != null && stops.length > 0 && selectedStop != null) {
            console.log("Creating Charts!")
            return (
                <ChartContainer stops={stops} route={route} selectedStop={selectedStop}/>
            )
        }
    }

    return(
        <div className="app-container">
            <SearchContainer
                route={route}
                setStops={setStops}
                stops={stops}
                setRoute={setRoute}
                selectedStop={selectedStop}
                setSelectedStop={setSelectedStop}/>
            {renderCharts()}

        </div>
    )
}