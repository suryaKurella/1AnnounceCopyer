// Title: Routing management
// Author: Darshan Shah - 1910463
// Info: This script manages below routes for 1announce project:
//      1. '/' - main route
//      2. '/slackAuth' - For authorizing slack account and storing user info
//      3. '/sendMsg' - For posting announcement to the slack channel
//      4. '/signup' - For fetching user id (email)

import fileUpload from 'express-fileupload';
import cors from "cors";
import rateLimit from "express-rate-limit";
import cron from "node-cron";
import express from 'express';
import User from './connect.js';
import fetch from "node-fetch";
import dotenv from 'dotenv'


const app = express();

// configuring environment variables
dotenv.config();


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('../client/build'))

}


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use(
    fileUpload({
        createParentPath: true,
    })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// express routing
app.use(express.urlencoded({
    extended: true
}))

app.post('/',limiter,async (req,res) => {
    try{
        let json_data = req.body;
        console.log(json_data)
        let isSchedule = ''
        if (json_data['isScheduleLater'] === "false"){
            isSchedule = 'without scheduler'
            const msg = json_data['message'];
            // retrieving email from cache
            const email = json_data['email'];

            // mongoose query for searching item using email as a param
            User.find({email:email}, function (err,data){
                if(err){
                    console.log(err);
                }
                else {
                    console.log(data);
                    const slackBotToken = data[0].user_data.access_token;
                    const channel = data[0].user_data.channel;


                    let payload = {
                        // fetch channel name from mongodb
                        channel: channel,
                        attachments: [
                            {
                                title: json_data['title'],
                                text: msg,
                                author_name: json_data['userName'],
                                color: "#e9114e",
                            },


                        ],

                    };
                    if (req.files) {
                        console.log(req.files.files)
                        payload['blocks'] = [
                            {
                                "type": "image",
                                "image_url": 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',
                                "alt_text": "cute cat"
                            }
                        ]
                    }

                    // post request to send message to slack
                    fetch("https://slack.com/api/chat.postMessage", {
                        method: "POST",
                        body: JSON.stringify(payload),
                        headers: {
                            "Content-Type": "application/json; charset=utf-8",
                            "Content-Length": payload.length,
                            Authorization: `Bearer ${slackBotToken}`,
                            Accept: "application/json",
                        },
                    })
                        .then((res) => {
                            if (!res.ok) {
                                throw new Error(`Server error ${res.status}`);
                            }
                            console.log('message sent ', Date.now())
                            return res.json();
                        })
                        .catch((error) => {
                            console.log(error);
                        });


                }
            });

        }

        else {
            isSchedule = 'with scheduler'

            let time = json_data['dateSchedule'].split(" ");
            // console.log(time);
            //Sat Nov 13 2021 12:13:50 GMT-0600 (Central Standard Time)
            //"27 15 13 11 *"
            let time_string = time[4].split(":")[1] + " " + time[4].split(":")[0]+  " " + time[2] + " 11 "+  "*";
            console.log(time_string)
            cron.schedule(time_string, () => {
                const msg = json_data['message'];

                // retrieving email from cache
                const email = json_data['email'];

                // mongoose query for searching item using email as a param
                User.find({email: email}, function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(data);
                        const slackBotToken = data[0].user_data.access_token;
                        const channel = data[0].user_data.channel;

                        const payload = {
                            // fetch channel name from mongodb
                            channel: channel,
                            attachments: [
                                {
                                    title: json_data['title'],
                                    text: msg,
                                    author_name: json_data['userName'],
                                    color: "#e9114e",
                                },
                            ],
                        };

                        // post request to send message to slack
                        fetch("https://slack.com/api/chat.postMessage", {
                            method: "POST",
                            body: JSON.stringify(payload),
                            headers: {
                                "Content-Type": "application/json; charset=utf-8",
                                "Content-Length": payload.length,
                                Authorization: `Bearer ${slackBotToken}`,
                                Accept: "application/json",
                            },
                        })
                            .then((res) => {
                                if (!res.ok) {
                                    throw new Error(`Server error ${res.status}`);
                                }
                                console.log('message sent ', Date.now())
                                return res.json();
                            })
                            .catch((error) => {
                                console.log(error);
                            });

                    }
                });

            })
        }

        res.send({
            status: 200,
            message: "Data is uploaded " + isSchedule
        })
    } catch (err){
        res.send({
            status: 404,
            message: "Error"
        })
        console.log(err)
    }
});

// app.post('/signup',(req,res) => {
//     // email will be fetched from request
//     const email = req.body.user_id;
//     console.log(email)
//     // email is cached here
//     myCache.set("email", email);
//     res.cookie('email', email);
//     // sending main UI component
//     res.sendFile(__dirname+'/helper/index.html')
// });
//
// app.get('/slackAuth', (req, res) => {
//
//     // Slack Auth code
//     const codeSlack = req.query.code;
//
//     // Using py script to fetch auth token and channel name
//     const pythonScript = spawn('python', [__dirname+'/helper/testing.py', codeSlack]);
//     pythonScript.stdout.on('data', (data) => {
//
//         try{
//             var userData = {
//                 access_token: JSON.parse(data.toString())['access_token'].toString(),
//                 channel: JSON.parse(data.toString())['incoming_webhook']['channel'].toString()
//             };
//         }
//         catch (err){
//             console.log(err);
//         }
//
//         // accessing email from cache
//         const email = myCache.get('email');
//
//         // saving userinfo into db
//         const newUser = new User({
//             email:email,
//             user_data:userData,
//             slack: true
//         });
//
//         newUser.save(function(err, data){
//             if(err){
//                 console.log(err);
//             }
//             else {
//                 console.log(data);
//             }
//         });
//
//     });
//
//     res.sendFile(__dirname+'/helper/sendMsg.html')
//
// });
//
// app.get('/test',(req,res) => {
//
//     let student = JSON.parse(rawdata);
//     console.log("====")
//     console.log(student);
//     console.log(student['dateSchedule'].split(" "));
//     res.send('done')
// });
//
// app.post('/sendMsg',(req,res) => {
//
//
//     let json_data = JSON.parse(rawdata);
//
//     if (json_data['isScheduleLater'] === "false"){
//         const msg = req.body.msg;
//
//         // retrieving email from cache
//         const email = myCache.get('email');
//
//         // mongoose query for searching item using email as a param
//         User.find({email:json_data['email']}, function (err,data){
//             if(err){
//                 console.log(err);
//             }
//             else {
//                 console.log(data);
//                 const slackBotToken = data[0].user_data.access_token;
//                 const channel = data[0].user_data.channel;
//
//                 const payload = {
//                     // fetch channel name from mongodb
//                     channel: channel,
//                     attachments: [
//                         {
//                             title: "This is a testing of 1announce",
//                             text: msg,
//                             author_name: "Darshan Shah",
//                             color: "#e9114e",
//                         },
//                     ],
//                 };
//
//                 // post request to send message to slack
//                 fetch("https://slack.com/api/chat.postMessage", {
//                     method: "POST",
//                     body: JSON.stringify(payload),
//                     headers: {
//                         "Content-Type": "application/json; charset=utf-8",
//                         "Content-Length": payload.length,
//                         Authorization: `Bearer ${slackBotToken}`,
//                         Accept: "application/json",
//                     },
//                 })
//                     .then((res) => {
//                         if (!res.ok) {
//                             throw new Error(`Server error ${res.status}`);
//                         }
//                         console.log('message sent ', Date.now())
//                         return res.json();
//                     })
//                     .catch((error) => {
//                         console.log(error);
//                     });
//
//             }
//         });
//
//     }
//     else {
//
//
//         // time = json_data['dateSchedule'].split(" ");
//         // console.log(time);
//
//         cron.schedule("27 15 13 11 *", () => {
//             const msg = req.body.msg;
//
//             // retrieving email from cache
//             const email = myCache.get('email');
//
//             // mongoose query for searching item using email as a param
//             User.find({email: email}, function (err, data) {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     console.log(data);
//                     const slackBotToken = data[0].user_data.access_token;
//                     const channel = data[0].user_data.channel;
//
//                     const payload = {
//                         // fetch channel name from mongodb
//                         channel: channel,
//                         attachments: [
//                             {
//                                 title: "This is a testing of 1announce",
//                                 text: msg,
//                                 author_name: "Darshan Shah",
//                                 color: "#e9114e",
//                             },
//                         ],
//                     };
//
//                     // post request to send message to slack
//                     fetch("https://slack.com/api/chat.postMessage", {
//                         method: "POST",
//                         body: JSON.stringify(payload),
//                         headers: {
//                             "Content-Type": "application/json; charset=utf-8",
//                             "Content-Length": payload.length,
//                             Authorization: `Bearer ${slackBotToken}`,
//                             Accept: "application/json",
//                         },
//                     })
//                         .then((res) => {
//                             if (!res.ok) {
//                                 throw new Error(`Server error ${res.status}`);
//                             }
//                             console.log('message sent ', Date.now())
//                             return res.json();
//                         })
//                         .catch((error) => {
//                             console.log(error);
//                         });
//
//                 }
//             });
//
//         })
//     }
//     // fetching posting message
//     // const msg = req.body.msg;
//     //
//     // // retrieving email from cache
//     // const email = myCache.get('email');
//     //
//     // // mongoose query for searching item using email as a param
//     // User.find({email:email}, function (err,data){
//     //     if(err){
//     //         console.log(err);
//     //     }
//     //     else {
//     //         console.log(data);
//     //         const slackBotToken = data[0].user_data.access_token;
//     //         const channel = data[0].user_data.channel;
//     //
//     //         const payload = {
//     //             // fetch channel name from mongodb
//     //             channel: channel,
//     //             attachments: [
//     //                 {
//     //                     title: "This is a testing of 1announce",
//     //                     text: msg,
//     //                     author_name: "Darshan Shah",
//     //                     color: "#e9114e",
//     //                 },
//     //             ],
//     //         };
//     //
//     //         // post request to send message to slack
//     //         fetch("https://slack.com/api/chat.postMessage", {
//     //             method: "POST",
//     //             body: JSON.stringify(payload),
//     //             headers: {
//     //                 "Content-Type": "application/json; charset=utf-8",
//     //                 "Content-Length": payload.length,
//     //                 Authorization: `Bearer ${slackBotToken}`,
//     //                 Accept: "application/json",
//     //             },
//     //         })
//     //             .then((res) => {
//     //                 if (!res.ok) {
//     //                     throw new Error(`Server error ${res.status}`);
//     //                 }
//     //
//     //                 return res.json();
//     //             })
//     //             .catch((error) => {
//     //                 console.log(error);
//     //             });
//     //
//     //     }
//     // });
//
//     res.sendFile(__dirname+"/helper/return.html");
//
// });


export default app.listen(process.env.PORT || 4000, () => console.log('listening...'))
