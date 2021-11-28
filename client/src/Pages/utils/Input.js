import React, { forwardRef } from "react";
import TextField from "@material-ui/core/TextField";

export const Input = forwardRef((props, ref) => {
    return (
        <TextField
            color={'success'}
            variant="outlined"
            margin="normal"
            inputRef={ref}
            required
            fullWidth
            {...props}
        />
    );
});
