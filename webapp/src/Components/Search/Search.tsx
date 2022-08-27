import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LoadingSpinner from "../LoadingSpinner";

type searchProps = {
    id: string,
    label: string,
    error: boolean,
    loading: boolean,
    errorText: string,
    options: string[],
    onInputChangeHandler: (event: object, value: string) => void;
}

export default function Search(props : searchProps) {

    const renderLoadingSpinner = () => (
        props.loading ? <LoadingSpinner isAppLogo={false}/> : null
    )

    return(
        <div className="search">
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
                        error={props.error}
                        helperText={props.error ? props.errorText : ""}
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                    />
                )}
            />
            {renderLoadingSpinner()}
        </div>
    )
}