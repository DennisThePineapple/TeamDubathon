import React, {useEffect, useState} from "react";
import Stop from "../Types/Stop";
import Search from "./Search";

type stopSearchProps = {
    stops: Stop[]
}

export default function StopSearch(props: stopSearchProps) {

    useEffect(() => {},
        [props.stops])
    return (
        <Search id={"stop-search"} label={"Bus Stop"} options={props.stops.map(stop => stop.stop_name)} onInputChangeHandler={() => {}} />
    );
}