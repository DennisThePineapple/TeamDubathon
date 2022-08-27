import React, {useState} from "react";
import BusCodes from "../Const/BusCodes";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import StopSearch from "./StopSearch";

export default function RouteSearch() {

    const [route, setRoute] = useState<string>();

    const handleOnChange = (event:any, values:any) => {
        setRoute(values);
    }

    const renderStopSearch = () => (
        route ? <StopSearch busCode={route}/> : null
    )

    return (
        <>
            <Autocomplete
                id="route-search-input"
                disableClearable
                options={BusCodes}
                style={{width: 300}}
                onChange={handleOnChange}
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
            {renderStopSearch()}
        </>

    );
}

