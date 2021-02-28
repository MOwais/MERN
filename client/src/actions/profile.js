import axios from 'axios';
import { setAlertAction } from './alert';

import {
    GET_PROFILE,
    PROFILE_ERROR
}
from './types';

export const getCurrentProfileAction = () => async dispatch => {
    try{
        const resp = await axios.get('/api/profile/me');
        dispatch({
            type:GET_PROFILE,
            payload:resp.data
        });
    }
    catch(err){
        console.error('Error getting user profile', err);
        dispatch({
            type:PROFILE_ERROR,
            payload: { msg: err.response.statusText, status:err.response.status}
        })
    }
}