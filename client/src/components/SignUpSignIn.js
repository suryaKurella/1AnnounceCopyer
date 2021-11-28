import React from 'react';
import {Container} from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {AuthProvider} from "../contexts/AuthContext";
import Signup from "./Signup";
import Announce from "../Pages/Announcer/Announce";
import ConfirmPage from './ConfirmPage'
import AppBar from "../Pages/utils/AppBar";
import PrivateRoute from "./PrivateRoute";

const SignUpSignIn = () => {
    return (
        <Container className={'d-flex align-items-center justify-content-center p-0'}
                   style={{minWidth: '100%'}}>
            <div className={'w-100'}>
                <Router>
                    <AuthProvider>
                        <AppBar/>
                        <Switch>
                            <PrivateRoute exact path={'/'} component={Signup}/>
                            <Route path={'/signup'} component={Signup}/>
                            <PrivateRoute path={'/announceform'} component={Announce}/>
                            <PrivateRoute path={'/confirm'} component={ConfirmPage}/>

                        </Switch>
                    </AuthProvider>
                </Router>
            </div>
        </Container>
    );
};
export default SignUpSignIn;
