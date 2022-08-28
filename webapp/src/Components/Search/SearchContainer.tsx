import React from "react";
import RouteSearch from "./RouteSearch";
import StopSearch from "./StopSearch";
import Stop from "../../Types/Stop";
import Route from "../../Types/Route";

type searchContainerProps = {
    stops: Stop[] | null,
    route: Route | null,
    selectedStop: Stop | null,
    setStops: (stops: Stop[]) => void,
    setRoute: (route: Route) => void,
    setSelectedStop: (stop: Stop | null) => void,
}

export default function SearchContainer(props: searchContainerProps) {

    const renderStopSearch = () => {
        if (props.stops && props.stops.length > 0) {
            return (
                <StopSearch
                    stops={props.stops}
                    selectedStop={props.selectedStop}
                    setSelectedStop={props.setSelectedStop}
                />
            )
        }
    }
    return (
        <div className="search-container">
            <RouteSearch setStops={props.setStops} setRoute={props.setRoute} route={props.route}/>
            {renderStopSearch()}
        </div>
    )
}