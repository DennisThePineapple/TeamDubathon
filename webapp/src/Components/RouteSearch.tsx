import React, {useEffect, useState} from "react";
import BusCodes from "../Const/BusCodes";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import StopSearch from "./StopSearch";
import API from "../Api/API";
import Stop from "../Types/Stop";
import LoadingSpinner from "./LoadingSpinner";


export default function RouteSearch() {

    const [stops, setStops] = useState<Stop[]>([]);
    const [show, setShow] = useState<boolean>(false);
    const [loaded, setLoad] = useState<boolean>(false);
    const [route, setRoute] = useState<string>("");
    const [latestRoute, setLatestRoute] = useState<string>("");

    const handleOnChange = (event:Object, value: string) => {
        setLatestRoute(value);
        setLoad(false);
        setShow(false);
        if (BusCodes.includes(value)) {
            setLoad(true);
            API.getStopsForBusCode(value).then(res => {
                setStops(res);
                setRoute(value);
            });

        } else {
            setStops([]);
        }
    }

    useEffect(() => {
        if (latestRoute == route && route != "") {
            setLoad(false);
            setShow(true);
        }
    }, [route])

    const renderStopSearch = () => (
        show ? <StopSearch stops={stops}/> : null
    )

    const renderLoadingSpinner = () => (
        loaded ? <LoadingSpinner isAppLogo={false}/> : null
    )

    return (
        <>
            <Autocomplete
                freeSolo
                id="route-search-input"
                disableClearable
                options={BusCodes}
                style={{width: 300}}
                onInputChange={handleOnChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Bus Route"
                        margin="normal"
                        variant="outlined"
                        size="medium"
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                    />
                )}
            />
            {renderLoadingSpinner()}
            {renderStopSearch()}
        </>

    );
}

