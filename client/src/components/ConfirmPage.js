import React, {useState} from "react";
import Confetti from "react-confetti";
import Swal from "sweetalert2";
import {makeStyles} from "@material-ui/core/styles";
import {Link, useHistory} from "react-router-dom";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InsertDriveFile from "@material-ui/icons/InsertDriveFile";
import {StoreContext} from "../contexts/MobxStoreContext";
import {PrimaryButton} from "../Pages/utils/PrimaryButton";
import {WrapContainer} from "../Pages/utils/WrapContainer";
import classes from '../Pages/StyleSheets/ConfirmPage.module.css'
import {useAuth} from '../contexts/AuthContext'
import {Card, CardActions, CardContent} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Box from "@mui/material/Box";

const useStyles = makeStyles({
    root: {
        marginBottom: "30px",
    },
    table: {
        marginBottom: "30px"
    },
});

const ConfirmPage = () => {
        const history = useHistory()
        const {currentUser} = useAuth()

        console.log(`current user = ${currentUser.email}`)
        console.log(currentUser.email)
        const store = React.useContext(StoreContext);

        const [success, setSuccess] = useState(false);
        const [successFinalPage, setSuccessFinalPage] = useState(false);
        const styles = useStyles();

        const entries = Object.entries(store).filter((entry) => entry[0] !== "mediaFile");
        const uiEntries = Object.entries(store).filter((entry) => {
            return entry[0] !== 'mediaFile' && entry[0] !== 'isScheduleLater'
        })

        const handleField = (entryField) => {

            if (entryField === "isTwitterCheckBoxFlag") {
                entryField = "Post to Twitter"
            } else if (entryField === "isSlackCheckBoxFlag") {
                entryField = "Post to Slack"
            } else if (entryField === "isTeamsCheckBoxFlag") {
                entryField = "Post to Teams"
            }

            return entryField.charAt(0).toUpperCase() + entryField.slice(1);

        }

        const onSubmit = async () => {
            const formData = new FormData();
            if (store.mediaFile) {
                store.mediaFile.forEach((file) => {
                    formData.append("files", file, file.name);
                });
            }
            formData.append('email', currentUser.email)
            entries.forEach((entry) => {
                formData.append(entry[0], entry[1]);
            });

            const res = await fetch("http://localhost:4000/", {
                method: "POST",
                body: formData,
            });

            if (res.status === 200) {
                await Swal.fire("Great job!", "Your message is posted", "success");
                setSuccess(true);

                // return <Confetti/>;
            }
        };


        if (success) {


            // return history.push('/announceform')

            return (
                <div>
                    {/*{history.push('/announceform')}*/}

                    <Card sx={{ maxWidth: 345 }}>

                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Share</Button>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>


                    {/*{Swal.fire("Congrats your messages have been succesfully posted", "success")}*/}

                    {/*<h2>Congrats your messages have been succesfully posted {"\u2728"}</h2>*/}


                    <div className={classes.giffer}/>
                    <Confetti/>;
                </div>
            )


        }

        return (
            <>
                <WrapContainer className={`${classes.card} p-5 text-center`}>
                    <Typography component="h2" variant="h5">
                        📋 Form Values
                    </Typography>

                    <TableContainer className={styles.root} component={Paper}>
                        <Table className={styles.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Field</TableCell>
                                    <TableCell align="center">Value</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>


                                {uiEntries.map((entry) => (
                                    <TableRow key={entry[0]}>
                                        <TableCell className="text-left" component="th" scope="row">
                                            {
                                                handleField(entry[0])
                                            }
                                        </TableCell>
                                        <TableCell align="center">
                                            {
                                                [true, false].includes(entry[1]) ? ((entry[1] === true) ? "Yes" : "No") : entry[1].toString()
                                            }

                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {store.mediaFile && (
                        <>
                            <Typography component="h2" variant="h5">
                                📦 Media
                            </Typography>
                            <List>
                                {store.mediaFile.map((f, index) => (
                                    <ListItem key={index}>
                                        <ListItemIcon>
                                            <InsertDriveFile/>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={f.name} secondary={f.size}
                                        />
                                        <img className={`text-center`}
                                             src={URL.createObjectURL(f)}
                                             alt={f.name}
                                             style={{
                                                 height: '200px',
                                             }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </>
                    )}
                    <PrimaryButton onClick={onSubmit}>Submit</PrimaryButton>
                    <Link to="/announceform">Start over</Link>
                </WrapContainer>
            </>
        )
    }
;

export default ConfirmPage
