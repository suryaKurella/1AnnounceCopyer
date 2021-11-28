import React from 'react';
import {InputLabel} from "@material-ui/core";
import classes from "../../Pages/StyleSheets/ChooseBotsPublish.module.css";
import formJson from "./Files/formJson";

const LogoBots = () => {
    const formValues = formJson()

    return <>
        {
            <InputLabel className={'mt-3 pb-3'}>
                You have authorized the following platforms for Broadcast
            </InputLabel>}

        {
            Object.entries(formValues).map(entry => {
                let {icon} = entry[1]
                return <div key={'' + Math.random()} className={`d-inline p-3 mt-5 mr-3 `}>
                    <div className={`d-inline ${classes.zoom}`}>
                        {icon}
                    </div>

                </div>
            })
        }
    </>;
};

export default LogoBots;
