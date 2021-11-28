import React from 'react';
import {Typography, TextField, Box} from "@material-ui/core";
import classes from '../UI/StyleSheets/FrontPageContent.module.css'

const FrontPageContent = () => {
    return (
        <div>
            <div className={classes['iconStyler-1']}>
                <img src="https://img.icons8.com/color/48/000000/slack-new.png"/>
            </div>
            <div className={classes['iconStyler-2']}>
                <img src="https://img.icons8.com/color/48/000000/twitter-circled--v2.png"/>
            </div>
            <div className={classes['iconStyler-3']}>
                <img src="https://img.icons8.com/fluency/48/000000/microsoft-teams-2019.png"/>
            </div>

            <Typography variant="h3" color="text.secondary" style={{
                position: "relative",
                left: '20%',
                top: '75vh',
                zIndex: 200,
                fontFamily: 'Monospace, serif'
            }}>

                {/*<div className={`${classes.frontPageDesc} `}>*/}
                <Typography variant="h3"
                            style={{
                                fontFamily: 'Monospace, serif',
                                position: "relative",
                            }}/*style= {{position: "relative",left:'20%' ,top:'60vh', zIndex:200, fontFamily:'Monospace, serif'}}*/>
                    A One Stop Solution for your
                </Typography>
                {/*<div className={`${classes['frontPageDesc-bottom']}`}>*/}
                <Typography variant="h3" style={{
                    fontFamily: 'Monospace, serif',
                    position: "relative",
                    left: '21%'
                }}
                            className={'p-3'}/*style= {{position: "relative",left:'35%' ,top:'60vh', zIndex:200, fontFamily:'Monospace, serif'}}*/>
                    Broadcasting
                </Typography>

            </Typography>


        </div>
    );
};

export default FrontPageContent;
