import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

type searchProps = {
    options: string[],
    onInputChangeHandler: (event: object, value: string) => void;
}

export default function Search(props : searchProps) {

    return(
        <Autocomplete
            freeSolo
            id="route-search-input"
            disableClearable
            options={props.options}
            style={{width: 300}}
            onInputChange={props.onInputChangeHandler}
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
    )
}