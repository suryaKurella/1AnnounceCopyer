import chai from "chai";
import chaiHttp from "chai-http";
import server from "../index.js";
chai.should();

chai.use(chaiHttp);

describe('Tasks API', () => {

    describe("POST /", () => {

        it("it should send message to channel at that moment", (done) => {
            const task = {
                message: "test 1",
                email: "darshan@123.com",
                isScheduleLater: "false",
                dateSchedule: "Sat Nov 21 2021 12:05:00 GMT-0600 (Central Standard Time)"
            };
            chai.request(server)
                .post("/")
                .send(task)
                .end((err, response) => {
                    console.log(response.body)
                    response.should.have.status(200);
                    response.body.should.be.a('Object');
                    response.body.should.have.property('message').eq("Data is uploaded without scheduler");
                    done();
                });
        });

        it("it should send message to channel after 2 minutes", (done) => {
            let time = new Date()
            const task = {
                message: "test 1",
                email: "darshan@123.com",
                isScheduleLater: "true",
                dateSchedule: new Date(time.getTime() + 2*60000).toString()
            };
            chai.request(server)
                .post("/")
                .send(task)
                .end((err, response) => {
                    console.log(response.body)
                    response.should.have.status(200);
                    response.body.should.be.a('Object');
                    response.body.should.have.property('message').eq("Data is uploaded with scheduler");
                    done();
                });
        });
    });
});

