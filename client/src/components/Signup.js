import React, {useRef, useState} from 'react';
import '../UI/StyleSheets/Signup.css'
import {Container, Row, Col, Form, Button, Card, Alert} from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'
import {Link, useHistory} from 'react-router-dom'
import classes from '../UI/StyleSheets/Card.module.css'
import materials from '../UI/StyleSheets/FormMaterial.module.css'

import cardClasses from '../UI/StyleSheets/generalCard.module.css'
import buttoners from '../UI/StyleSheets/Buttons.module.css'
import boomer from '../UI/images/wrote.png'
import Login from './Login'
import FrontPageContent from './FrontPageContent'
import AppBar from '../Pages/utils/AppBar'

const Signup = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const userNameRef = useRef()
    const passwordConfirmRef = useRef()
    const {signup} = useAuth()

    const [error, setError] = useState('')
    const [signInSuccess, setSignInSuccess] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const [isOldUser, setIsOldUser] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(`passwordRef.current.value = ${passwordRef.current.value}`)
        console.log(`passwordConfirmRef.current.value = ${passwordConfirmRef.current.value}`)

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords Do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value, userNameRef.current.value)
            console.log("Setting up the user registration")
            setSignInSuccess("Registration Successful! Please move to Sign in Page")
            history.push('/')
        } catch (e) {
            // setError("Failed to create an Account")
            setError("User Already Exists! Please Sign in")
        }
        setLoading(false)
    }


    const handleShow = () => {

        document.getElementById('password').innerText = passwordRef.current.value

        console.log(passwordRef.current.value)

    }

    const loginHandler = () => {

        setIsOldUser(true)

        console.log(isOldUser)

    }

    const signUpHandler = (isSignUpClick) => {

        console.log(`isSignUpClick = ${isSignUpClick}`)

        setIsOldUser(isSignUpClick)

    }


    return (
        <div className={'align-items-center justify-content-center'}>
            {/*<AppBar/>*/}

            <Row>

                <Col className={`gap-padding`}>


                    <Card className={`${cardClasses.card} ml-0 border-0`}>
                        <div className={'announcement text-white'}>
                            <FrontPageContent/>
                        </div>
                    </Card>
                </Col>


                <Col xs lg="5" className={`gap-padding`}>
                    <Card className={`${classes.cardFrontPage} vertical-full border-0`}>
                        {!isOldUser ?
                            < Card.Body>
                                {/*<h2 className={'text-center mb-4 text-white'}>Sign up</h2>*/}
                                <h2 className={'text-center mb-4 text-white mt-4'}>
                                    Create a 1

                                    <h2 className={'text-center d-inline text-danger'}>A</h2>

                                    nnounce

                                    Account

                                </h2>
                                {error && <Alert variant={'danger'}>{error}</Alert>}
                                {console.log(`signInSuccess = ${signInSuccess}`)}
                                {signInSuccess && <Alert variant={'success'}>{signInSuccess}</Alert>}
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group id={'username'} className={'ml-5 mr-5'}>
                                        <Form.Label className={'text-white'}>User Name</Form.Label>
                                        <Form.Control
                                            className={'boomer border border-top-0 border-left-0 border-right-0'}
                                            placeholder={'Display Name'} autoComplete="new-password"
                                            type={'text'} ref={userNameRef} required/>
                                    </Form.Group>


                                    <Form.Group id={'email'} className={'ml-5 mr-5'}>
                                        <Form.Label className={'text-white'}>Email</Form.Label>


                                        <Form.Control
                                            className={'boomer border border-top-0 border-left-0 border-right-0'}
                                            placeholder={'Email Address'} autoComplete="new-password"
                                            type={'email'} ref={emailRef} required/>
                                    </Form.Group>


                                    <Form.Group id={'password'} className={'ml-5 mr-5'}>
                                        <Form.Label className={'text-white'}>Password</Form.Label>
                                        <Form.Control
                                            className={'boomer border border-top-0 border-left-0 border-right-0'}
                                            placeholder={'Password'} type={'password'} ref={passwordRef}
                                            required/>
                                    </Form.Group>
                                    <Form.Group id={'password-confirm'} className={'ml-5 mr-5'}>
                                        <Form.Label className={'text-white'}>Password Confirmation</Form.Label>
                                        <Form.Control
                                            className='boomer border border-top-0 border-left-0 border-right-0'
                                            placeholder={'Confirm Password'} type={'password'}
                                            ref={passwordConfirmRef}
                                            required/>
                                    </Form.Group>

                                    <Form.Group className={`signup-btn`}>
                                        <Button disabled={loading}
                                                className={`${buttoners.submitBtn} w-100 bg-success shadow-none `}
                                                type={'submit'}>Sign
                                            Up</Button>
                                    </Form.Group>

                                </Form>


                                <div className={'w-100 text-center mt-5 text-white'}>


                                    {/*Already have an account ? <Link to={'/login'}>Login</Link>*/}
                                    Already have an account ? <Button variant={'outlined'} className={'text-white'}
                                                                      type={'button'}
                                                                      onClick={loginHandler}>Login</Button>
                                </div>
                            </Card.Body> : <Login onSignUpClick={signUpHandler}/>
                        }

                    </Card>
                </Col>
            </Row>


        </div>
    );
};

export default Signup;
