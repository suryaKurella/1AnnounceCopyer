import React from "react";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import {Paper} from "@material-ui/core";
import {Card} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
}));

export const WrapContainer = ({children, ...props}) => {
    const styles = useStyles();

    return (
        <Container
            variant={'elevation'}
            elevation={24}
            className={`${styles.root} p-4 text-center`}
            component="main"
            maxWidth="md"
            {...props}
        >
            {children}
        </Container>
    );
};
