import React, {useReducer} from 'react';
import {Form, Button, Card, Alert} from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'
import {useHistory} from 'react-router-dom'
import classes from "../UI/StyleSheets/Card.module.css";
import '../UI/StyleSheets/Signup.css'
import buttoners from '../UI/StyleSheets/Buttons.module.css'
import Loginreducer from "../reducers/Loginreducer";


const Login = (props) => {
    const initialState = {
        email: '',
        password: '',
        error: '',
        loading: false,
        isLoggedIn: false
    }

    const [state, dispatch] = useReducer(Loginreducer, initialState)
    let {email, error, loading, isLoggedIn, password} = state

    const {login} = useAuth()
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(`emailRef.current.value = ${email}`)
        console.log(`passwordRef.current.value = ${password}`)

        try {
            dispatch({type: 'LOGIN_SUCCESS'})
            await login(email, password)
            dispatch({type: `LOGIN_SUCCESS_AFTER`})
        } catch (e) {
            dispatch({type: 'LOGIN_FAILURE'})
        }

        dispatch({type: "SET_LOADING_FALSE"})
    }
    return (
        <div>

            {console.log(`isLoggedIn = ${isLoggedIn}`)}
            {isLoggedIn ? history.push('/announceform') : ""}


            <Card className={classes.cardFrontPage}>
                <Card.Body>
                    <h2 className={'text-center mb-4 text-white'}>Log In</h2>
                    {error && <Alert variant={'danger'}>{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id={'email'} className={'ml-5 mr-5'}>
                            <Form.Label className={'text-white'}>Email</Form.Label>
                            <Form.Control
                                placeholder={'Email Address'}
                                type={'email'}
                                onChange={e => dispatch({
                                    type: 'FIELD',
                                    field: 'email',
                                    value: e.currentTarget.value
                                })}
                                value={email}
                                required/>
                        </Form.Group>
                        <Form.Group id={'password'} className={'ml-5 mr-5'}>
                            <Form.Label className={'text-white'}>Password</Form.Label>
                            {/*<Form.Control placeholder={'Password'} type={'password'} ref={passwordRef} required/>*/}
                            <Form.Control
                                placeholder={'Password'}
                                type={'password'}
                                onChange={e => dispatch({
                                    type: 'FIELD',
                                    field: 'password',
                                    value: e.currentTarget.value
                                })}
                                value={password}
                                required
                            />
                        </Form.Group>

                        <Form.Group className={`signup-btn`}>

                            <Button disabled={loading}
                                    className={`${buttoners.submitBtn} submit-btn w-100 bg-success shadow-none`}
                                    type={'submit'}>Log
                                in</Button>
                        </Form.Group>

                        <div className={'w-100 text-center mt-2 text-white'}>

                            {/*Need an account ? <Link to={'/signup'}>Sign Up</Link>*/}
                            Need an account ? <Button variant={'outlined'} className={'text-white'}
                                                      onClick={() => props.onSignUpClick(false)}>Sign
                            Up</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
        ;
};


export default Login;
