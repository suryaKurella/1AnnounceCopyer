import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

const IconAdornmentField = ({children, ...props}) => {
    return (
        <InputAdornment>
            <IconButton>
                {children}
            </IconButton>
        </InputAdornment>
    );
};

export default IconAdornmentField
