import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

type searchProps = {
    id: string,
    label: string,
    options: string[],
    onInputChangeHandler: (event: object, value: string) => void;
}

export default function Search(props : searchProps) {

    return(
        <Autocomplete
            freeSolo
            id={props.id}
            disableClearable
            options={props.options}
            style={{width: 300}}
            onInputChange={props.onInputChangeHandler}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={props.label}
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