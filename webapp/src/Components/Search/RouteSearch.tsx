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
export default function RouteSearch(props: routeSearchProps) {

    const [loading, setLoad] = useState<boolean>(false);
    const [busCode, setBusCode] = useState<string>("");
    const [latestRoute, setLatestRoute] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const handleOnChange = (event:Object, value: string) => {
        setLatestRoute(value);
        setLoad(false);
        setError(false);
        if (BusCodes.includes(value)) {
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

