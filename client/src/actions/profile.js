import axios from 'axios';
import { setAlertAction } from './alert';

import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE
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

//Add experience

export const addExperienceAction = (formData, history) => async dispatch => {
    try{
        const config = {
            headers:{
                'content-type':'application/json'
            }
        }

        const res = await axios.put('/api/profile/experience', formData, config);
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        });
      
        dispatch(setAlertAction('Experience Added!', 'success'));
        history.push('/dashboard');

      
    }
    catch(err){
        console.error('Error updating experience', err);

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

//Add education
export const addEducationAction = (formData, history) => async dispatch => {
    try{
        const config = {
            headers:{
                'content-type':'application/json'
            }
        }

        const res = await axios.put('/api/profile/education', formData, config);
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        });
      
        dispatch(setAlertAction('Education Added!', 'success'));
        history.push('/dashboard');

      
    }
    catch(err){
        console.error('Error updating education', err);

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