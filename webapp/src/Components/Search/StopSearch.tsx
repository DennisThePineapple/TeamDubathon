import React, {useEffect, useState} from "react";
import Stop from "../../Types/Stop";
import Search from "./Search";

type stopSearchProps = {
    stops: Stop[],
    selectedStop: Stop | null,
    setSelectedStop: (stop: Stop | null) => void,
}

export default function StopSearch(props: stopSearchProps) {
    const [error, setError] = useState<boolean>(false);

    const handleOnChange = (event: Object, value: string) => {
        const findSelectedStop = props.stops.find(stop => stop.stop_name === value);
        setError(!(value === "" || findSelectedStop));
        if (findSelectedStop) {
            props.setSelectedStop(findSelectedStop);
        } else {
            props.setSelectedStop(null);
        }
    }

    const stopsToString = () => {
        return props.stops.map(stop => stop.stop_name)
    }


    useEffect(() => {
        props.setSelectedStop(null);
    },
        [props.stops])
    return (
        <Search id={"stop-search"}
                label={"Bus Stop"}
                error={error}
                errorText={"Non-existent bus stop"}
                loading={false}
                options={stopsToString()}
                onInputChangeHandler={handleOnChange}
        />
    );
}