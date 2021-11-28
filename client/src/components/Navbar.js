import React, {useState} from 'react';
import {AppBar, Toolbar, Button} from '@material-ui/core'
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Typography from "@material-ui/core/Typography";
import {useAuth} from "../contexts/AuthContext";
import {useHistory} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = () => {
    const [value, setValue] = useState(0)
    const {logout, currentUser} = useAuth()
    const history = useHistory()

    const handleClickTab = (e, newValue) => {
        setValue(newValue)
    }

    return (
        <>
            <AppBar color={'secondary'}>
                <Toolbar>
                    <Typography>1Announce</Typography>
                    <Tabs
                        onChane={handleClickTab}
                        indicatorColor="primary"
                        value={value}
                        textColor="white"
                    >
                        {/*<Tab value="Announce" label="1Announce"/>*/}
                        <Tab value="About" label="About"/>
                        <Tab value="Pricing" label="Pricing"/>
                    </Tabs>

                    {currentUser &&

                    <div>
                        <IconButton

                            edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                            <LogoutIcon/>
                            {/*<AccountCircleIcon/>*/}
                        </IconButton>

                        <Button variant={'outlined'}
                                className={'text-white bg bg-danger text-center'}
                                type={'button'}

                                onClick={async () => {

                                    try {
                                        await logout();
                                        history.push("/signup")

                                    } catch (err) {
                                        console.error(err)
                                    }

                                }}>Logout
                        </Button>
                    </div>
                    }

                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;
