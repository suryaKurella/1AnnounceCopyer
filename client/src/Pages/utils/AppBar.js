import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Col, Container, Row} from 'react-bootstrap'
import CachedIcon from '@mui/icons-material/Cached';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from "@material-ui/core/Button";
import LogoutIcon from '@mui/icons-material/Logout';
import classes from "../../UI/StyleSheets/Card.module.css";
import {useState} from "react";
import {useHistory} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SpeakerPhoneIcon from '@mui/icons-material/SpeakerPhone';
import InfoIcon from '@mui/icons-material/Info';
import {FaBeer} from 'react-icons/fa';
import glasses from '../StyleSheets/AppBar.module.css'
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

export default function AppBarr() {

    const history = useHistory()
    const {logout, currentUser} = useAuth()

    const handleClick = () => {


        history.push("/")
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="flex"
                    style={{
                        backgroundColor: '#000000',
                        color: 'white',
                        width: '100vw'
                        // backgroundImage:url('http://i.stack.imgur.com/kx8MT.gif');
                    }}
            >
                <Toolbar>


                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <MenuIcon/>
                        {/*<AccountCircleIcon/>*/}
                    </IconButton>


                    <div className={`d-inline ${glasses.logo}`} onClick={handleClick}>


                        <Typography className={'d-inline'} style={{fontSize: 40}} variant="h6" color="inherit"
                                    component="div">
                            1
                        </Typography>
                        <Typography className={'d-inline'} style={{fontSize: 40}} variant="h6" color="red"
                                    component="div">
                            A
                        </Typography>
                        <Typography className={'d-inline'} style={{fontSize: 40}} variant="h6" color="inherit"
                                    component="div">
                            nnounce
                        </Typography>
                    </div>
                    {
                        (localStorage.getItem('isUserLog') === 'true') &&
                        <Container className={`text-center}`}>
                            <Row>
                                <Col>

                                    <Tab className={`${glasses['opacity-5']} ${glasses.zoom} `}
                                         icon=<InfoIcon/> value="About" label="About"/>
                                </Col>

                                <Col>
                                    <Tab onClick={() => history.push('/announceform')}
                                         className={`${glasses['opacity-5']} ${glasses.zoom}`}
                                         icon=<SpeakerPhoneIcon/> value="Broadcast" label="Broadcast" />
                                </Col>
                                <Col>
                                    <Tab className={`${glasses['opacity-5']} ${glasses.zoom}`}
                                         icon=<CachedIcon/> value="Announcements" label="Announcements"/>

                                </Col>

                                <Col>
                                    <Tab
                                        className={`${glasses['opacity-5']} text-white bg bg-danger pr-5 pl-5  `}
                                        icon={<LogoutIcon/>}
                                        value="Logout"
                                        label="Logout"
                                        onClick={async () => {

                                            localStorage.setItem('isUserLog', false)

                                            try {
                                                await logout();
                                                history.push("/signup")

                                            } catch (err) {
                                                console.error(err)
                                            }

                                        }}
                                    />


                                </Col>
                                <Col>
                                    <Tab className={`${glasses['opacity-5']} `}
                                         icon=<PersonOutlineIcon/> value="Announcements" label={currentUser.displayName}/>

                                </Col>
                            </Row>
                        </Container>
                    }
                    {/*</Tabs>*/}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
