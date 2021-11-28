import React from 'react';

const Loginreducer = (state, action) => {


    switch (action.type) {
        case "LOGIN_SUCCESS": {
            return {
                ...state,
                error: '',
                loading: true,
                isLoggedIn: false

            }
        }
        case "LOGIN_FAILURE": {
            return {
                ...state,
                error: 'May be you do not have an account! Please Sign up',
                loading: false,
                email: '',
                password: '',
            }
        }

        case 'FIELD': {
            return {
                ...state,
                [action.field]: action.value
            }
        }

        case 'SET_LOADING_FALSE': {
            return {
                ...state,
                loading: false,
            }
        }

        case 'LOGIN_SUCCESS_AFTER': {
            return {
                ...state,
                isLoggedIn: true
            }
        }


    }

};

export default Loginreducer;
