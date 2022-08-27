import React, {useEffect, useState} from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Stop from "../Types/Stop";
import API from "../Api/API";

type stopSearchProps = {
    busCode: string
}

export default function StopSearch(props: stopSearchProps) {
    const [stops, setStops] = useState<Stop[]>([]);

    useEffect(() => {
        API.getStopsForBusCode(props.busCode).then(res => setStops(res));
    }, [])
    return (
        <Autocomplete
            id="stop-search-input"
            disableClearable
            options={stops.map(stop => stop.stop_name)}
            style={{width: 300}}
            onChange={(event, newValue) => {
                console.log(newValue);
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Bus Stop"
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
    );
}