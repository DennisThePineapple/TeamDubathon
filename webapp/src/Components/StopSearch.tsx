import React, {useEffect, useState} from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Stop from "../Types/Stop";
import API from "../Api/API";

type stopSearchProps = {
    stops: Stop[]
}

export default function StopSearch(props: stopSearchProps) {
    // const [stops, setStops] = useState<Stop[]>([]);

    useEffect(() => {},
        [props.stops])
    return (
        <Autocomplete
            id="stop-search-input"
            disableClearable
            options={props.stops.map(stop => stop.stop_name)}
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