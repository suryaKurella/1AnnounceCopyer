import chai from "chai";
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.URI;
console.log(uri);

chai.should();

describe('Access to DB', function(){
    describe('check db', function(){
        it('should connect to db properly', function(done){
            const connectDB = async() => {
                try
                {
                    await mongoose.connect(uri, {
                        useUnifiedTopology: true,
                        useNewUrlParser: true
                    });
                    console.log('db connected...');
                }
                catch (err){
                    console.log(err);
                }
            }
            connectDB();
            done();
        })
    })
});


