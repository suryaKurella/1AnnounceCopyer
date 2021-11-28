import React, {useContext, useEffect} from 'react';
import classes from '../StyleSheets/AnnouncementPage.module.css'
import {Grid, Paper, Card} from '@material-ui/core'
import {useForm, FormProvider} from 'react-hook-form'
import DatePickerFunc from "../Announcer/DatepickerFunc";
import {StoreContext} from '../../contexts/MobxStoreContext';
import GridUtilFormCommon from "../utils/GridUtilFormCommon";
import {yupResolver} from "@hookform/resolvers/yup";
import {PrimaryButton} from "../utils/PrimaryButton";
import {useObserver} from "mobx-react";
import {FileUploader} from '../utils/FileUploader'
import {useHistory} from "react-router-dom";
import Title from "../../components/AnnounceForm/Title";
import axios from 'axios'
//component import
import formSchemaBase from "../YupSchemas/FormSchemaBase";
import UserName from "../../components/AnnounceForm/UserName";
import Message from "../../components/AnnounceForm/Message";
import LogoBots from "../../components/AnnounceForm/LogoBots";
import CheckBoxBots from "../../components/AnnounceForm/CheckBoxBots";
import {Button} from "react-bootstrap";
import {useAuth} from "../../contexts/AuthContext";


const url = 'http://localhost:4000/authFlags'
const fetchAuthDBFlags = () => axios.get(url)


//constants
const BROADCAST_RIGHTNOW = "BroadCast right now"

//constants for useForm Hook
const MESSAGE = "message"

const schema = formSchemaBase()

const AnnounceForm = () => {
    const {currentUser} = useAuth()

    console.log("Yover = ")
    console.log(currentUser.displayName)

    const store = useContext(StoreContext)
    const history = useHistory()
    const methods = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema)
    })
    const {control, register, formState: {errors}} = methods;


    console.log("Errors:", errors);

    return useObserver(() =>
        <Grid container
              direction={'row'}
              alignContent={'center'}
              justifyContent={'center'}
        >
            <GridUtilFormCommon

            >

                <Card className={`${classes.announcePageImage}`}/>
            </GridUtilFormCommon>

            <GridUtilFormCommon
                alignContent={'center'}

            >

                <Paper
                    className={`p-4 m-4 ${classes['card-announce']}`}
                    variant={'elevation'}
                    elevation={24}
                >
                    <FormProvider {...methods}>
                        <form noValidate autoComplete={'off'}

                              onSubmit={methods.handleSubmit((data) => {



                                  console.log("Erroroso asj fsf = ")
                                  console.log(errors)

                                  // let {userName, message, scheduler, slack, twitter, teams, dateSchedule, files} = data
                                  let { title, message, scheduler, slack, twitter, teams, dateSchedule, files} = data
                                  if (scheduler === BROADCAST_RIGHTNOW) {
                                      dateSchedule = new Date()
                                  }
                                  // store.userName = userName
                                  store.userName = currentUser.displayName
                                  store.title = title
                                  store.message = message
                                  store.scheduler = scheduler
                                  store.isScheduleLater = scheduler !== BROADCAST_RIGHTNOW
                                  store.isSlackCheckBoxFlag = [true, false].includes(slack) ? slack : false
                                  store.isTwitterCheckBoxFlag = [true, false].includes(twitter) ? twitter : false
                                  store.isTeamsCheckBoxFlag = [true, false].includes(teams) ? teams : false
                                  store.mediaFile = files
                                  store.dateSchedule = dateSchedule


                                  console.log(data)
                                  history.push('/confirm')
                              })}>
                            {/*<UserName/>*/}
                            <Title/>
                            {/*Message*/}
                            <Message message={MESSAGE}/>


                            {/*FileUploader*/}
                            <FileUploader name="files" control={control}/>
                            {/*DatePicker*/}
                            <DatePickerFunc/>
                            {/*Bots Logo Code*/}
                            <LogoBots/>
                            {/*Bots CheckBox Code*/}
                            <CheckBoxBots {...methods}/>

                            <PrimaryButton type={'submit'}>
                                Review
                            </PrimaryButton>



                        </form>
                    </FormProvider>
                </Paper>
            </GridUtilFormCommon>
        </Grid>
    );
};

export default AnnounceForm;
