import React, {useEffect, useState} from "react";
import Stop from "../Types/Stop";
import Search from "./Search";

type stopSearchProps = {
    stops: Stop[]
}

export default function StopSearch(props: stopSearchProps) {
    const [error, setError] = useState<boolean>(false);

    const handleOnChange = (event: Object, value: string) => {
        if (value == "" || stopsToString().includes(value)) {
            setError(false);
        } else {
            setError(true);
        }
    }

    const stopsToString = () => {
        return props.stops.map(stop => stop.stop_name)
    }


    useEffect(() => {},
        [props.stops])
    return (
        <Search id={"stop-search"} label={"Bus Stop"}
                error={error} errorText={"Non-existent bus stop"}
                options={stopsToString()} onInputChangeHandler={handleOnChange} />
    );
}