import React, {useEffect, useState} from "react";
import BusCodes from "../Const/BusCodes";
import StopSearch from "./StopSearch";
import API from "../Api/API";
import Stop from "../Types/Stop";
import LoadingSpinner from "./LoadingSpinner";
import Search from "./Search";


export default function RouteSearch() {

    const [stops, setStops] = useState<Stop[]>([]);
    const [show, setShow] = useState<boolean>(false);
    const [loading, setLoad] = useState<boolean>(false);
    const [route, setRoute] = useState<string>("");
    const [latestRoute, setLatestRoute] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const handleOnChange = (event:Object, value: string) => {
        setLatestRoute(value);
        setLoad(false);
        setShow(false);
        setError(false);
        if (BusCodes.includes(value)) {
            setLoad(true);
            API.getStopsForBusCode(value).then(res => {
                setStops(res);
                setRoute(value);
            });

        } else {
            if (value != "") {
                setError(true);
            }
        }
    }

    useEffect(() => {
        if (latestRoute == route && route != "") {
            setLoad(false);
            setShow(true);
        }
    }, [route, latestRoute])

    const renderStopSearch = () => (
        show ? <StopSearch stops={stops}/> : null
    )

    return (
        <>
            <Search id={"route-search"} label={"Bus Route"}
                    error={error} errorText={"Non-existent bus route"}
                    loading={loading}
                    options={BusCodes} onInputChangeHandler={handleOnChange} />
            {renderStopSearch()}
        </>

    );
}

