import mongoose from 'mongoose';
import dotenv from 'dotenv';
import * as express from "express";

dotenv.config();

const uri = process.env.URI;
console.log(uri);

// DB connection
const connectDB = async() => {
    try
    {
        await mongoose.connect(process.env.MongoDB_URI || uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('db connected...');
    }
    catch (err){
        console.log(err);
    }
}

// schema creation for Users
const userSchema = new mongoose.Schema({
    email: String,
    user_data: typeof ({}),
    slack: Boolean,
    teams: Boolean,
    twitter: Boolean
});
connectDB();




const user = mongoose.model('users', userSchema);
export default user;
