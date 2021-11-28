import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(3, 0, 2),

    },
}));

export const PrimaryButton = ({ children, ...props }) => {
    const styles = useStyles();

    return (
        <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{backgroundColor: '#0d0f53', color: '#FFFFFF'}}
            className={styles.root}
            {...props}
        >
            {children}
        </Button>
    );
};
