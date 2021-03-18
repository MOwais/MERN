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
        });
    }
}

//create or update profile
export const createProfileAction = (formData, history, edit = false) => async dispatch => {
    try{
        const config = {
            headers:{
                'content-type':'application/json'
            }
        }

        console.log("ACTION FORM DATA", formData);
        const res = await axios.post('/api/profile', formData, config);
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        });
        const type = edit ? 'Profile Updated' : 'Profile Created';
        dispatch(setAlertAction(type, 'success'));

        if(type == 'Profile Created'){
            history.push('/dashboard');
        }
    }
    catch(err){
        console.error('Error getting user profile', err);

        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlertAction(error.msg,'danger')))
        }
        dispatch({
            type:PROFILE_ERROR,
            payload: { msg: err.response.statusText, status:err.response.status}
        });
    }
}