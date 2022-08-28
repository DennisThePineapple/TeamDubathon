import React, {useEffect, useState} from "react";
import BusCodes from "../../Const/BusCodes";
import API from "../../Api/API";
import Stop from "../../Types/Stop";
import Search from "./Search";
import Route from "../../Types/Route";

type routeSearchProps = {
    setStops: (stops: Stop[]) => void,
    setRoute: (route: Route) => void,
    route: Route | null,
}

const fakeStop: Stop = {
    feed_id: "string",
    stop_id: 'string',
    parent_station_id: 'string',
    location_type: 1,
    stop_name: 'Clean Couch Lane',
    stop_lat: 1,
    stop_lon: 1,
    wheelchair_boarding: 1,
    stop_code: 'string',
    zone_id: 'string',
    stop_url: 'string',
    stop_desc: "asf",
    stop_timezone: "asf"
}

const fakeRoute: Route = {
    feed_id: 'string',
    route_id: 'FAKEROUTE',
    agency_id: 'string',
    route_short_name: 'string',
    route_long_name: 'string',
    route_desc: 'string',
    route_type: 1,
    route_url: 'string',
    route_color: 'string',
    route_text_color: 'string',
}
export default function RouteSearch(props: routeSearchProps) {

    const [loading, setLoad] = useState<boolean>(false);
    const [busCode, setBusCode] = useState<string>("");
    const [latestRoute, setLatestRoute] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const handleOnChange = (event:Object, value: string) => {
        setLatestRoute(value);
        setLoad(false);
        setError(false);
        if (value === "Fake Taxi Bus") {
            props.setStops([fakeStop]);
            setBusCode(value);
            props.setRoute(fakeRoute);
        }
        else if (BusCodes.includes(value)) {
            setLoad(true);
            API.getStopsForBusCode(value).then(res => {
                props.setStops(res);
                setBusCode(value);
                API.getRouteForBusCode(value).then(route => props.setRoute(route));
            });

        } else {
            if (value !== "") {
                setError(true);
            }
        }
    }

    useEffect(() => {
        if (latestRoute == busCode && busCode != "") {
            setLoad(false);
        } else if (latestRoute != busCode) {
            props.setStops([]);
        }
    }, [busCode, latestRoute])


    return (
        <>
            <Search id={"route-search"}
                    label={"Bus Route"}
                    error={error}
                    errorText={"Non-existent bus route"}
                    loading={loading}
                    options={BusCodes}
                    onInputChangeHandler={handleOnChange}
            />
        </>

    );
}

