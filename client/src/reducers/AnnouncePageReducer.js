import React from 'react';

const AnnouncePageReducer = (state, action) => {
    switch (action.type) {
        case 'FIELD': {
            return {
                ...state,
                [action.field]: action.value
            }
        }
        case 'IS_SCHEDULE_TRUE':{
            return{
                ...state,
                isScheduleLater:true
            }
        }
        case 'IS_SCHEDULE_FALSE':{
            return{
                ...state,
                isScheduleLater:false
            }
        }
    }
};

export default AnnouncePageReducer;
