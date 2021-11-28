import React from 'react';
import {Button, Form, FormLabel} from "react-bootstrap";
import TimePicker from 'react-bootstrap-time-picker';
import { BsTwitter, BsDiscord } from "react-icons/bs";

/**
 *@Author: Gowtham Gudipudi
 * @name: BroadcastForm
 * @desc: The BroadcastForm provides the functionality to upload the message or media,
 * that needs to be broadcasted to different channels like Microsoft Teams, Slack, Twitter,
 * It also gives the option to schedule the broadcast to future date and time
 */

class BroadcastForm extends React.Component {

    /**
     * @constructor to handle the state of the check box to schedule it right now or in the future
     */

    constructor(props) {
        super(props);
        this.state = {
            hidden: true
        }
    }

    render() {
        const {hidden} = this.state;
        return (
            <div >
                <div>
                    <Form>
                        <Form.Group className="mb-3" controlId="MessageInput">
                            <FormLabel>Enter your Message</FormLabel>
                            <Form.Control as="textarea" rows={3}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="FileUpload">
                            {/*<Form.Label>Choose .csv, .txt, .mp4 files</Form.Label>*/}
                            <Form.Control type="file" multiple/>
                        </Form.Group>

                        <img src="https://img.icons8.com/fluency/50/000000/microsoft-teams-2019.png" />
                        <img src="https://img.icons8.com/doodle/50/000000/slack-new.png"/>
                        <img src="https://img.icons8.com/color/50/000000/twitter--v1.png"/>

                        {/*
                        <BsTwitter size="80px" color="#00ACEE" />
                        <BsDiscord size="80px" color="#7289DA" />*/}
                        <br/>

                        <FormLabel>Select the channel to which you want to Broadcast</FormLabel>
                        <br/>
                        <Form.Check type="checkbox" label="Microsoft Teams"/>
                        <Form.Check type="checkbox" label="Twitter"/>
                        <Form.Check type="checkbox" label="Discord"/>
                        <br/>

                        /**
                        * This part of the code helps in identifying the state of the check box and making the time and
                        date picker availability for the end user
                        */

                        <Form.Group className="mb-3" controlId="ScheduleCheck">
                            <Form.Check type="checkbox" label="Do you want to schedule this broad cast?"
                                        onChange={() => this.setState(prevState => ({
                                            hidden: !prevState.hidden
                                        }))}/>
                        </Form.Group>

                        <Form.Group controlId={"Date"}>
                            <Form.Label> Select Date</Form.Label>
                            <Form.Control type="date" name="date" placeholder="Scheduled Date" disabled={hidden}/>
                        </Form.Group>

                        <Form.Label> Select Time</Form.Label>
                        <TimePicker start="06:00" end="21:00" step={30} disabled={hidden}/>

                        <Button variant="primary" type="submit" className={'bg-primary text-white m-2'}>Submit</Button>
                        <Button variant="primary" type="cancel" className={'bg-danger text-white'}>Cancel</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default BroadcastForm;
