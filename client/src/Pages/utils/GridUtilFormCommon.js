import React from 'react';
import {Grid} from "@material-ui/core";

const GridUtilFormCommon = ({children, ...props}) => {
    return (
        <Grid
            container
            direction={'row'}
            justifyContent={'center'}
            item md={6} xs={6} sm={12}
            {...props}
        >
            {children}
        </Grid>
    );
};

export default GridUtilFormCommon
