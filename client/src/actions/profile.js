import axios from 'axios';
import { setAlertAction } from './alert';

import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    ACCOUNT_DELETED,
    CLEAR_PROFILE,
    GET_REPOS
}
from './types';

//Get profile
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

//Get all profiles
export const getAllProfilesAction = () => async dispatch => {
    dispatch({type:CLEAR_PROFILE})
    try{
        const resp = await axios.get('/api/profile');
        dispatch({
            type:GET_PROFILES,
            payload:resp.data
        });
    }
    catch(err){
        console.error('Error getting all profiles', err);
        dispatch({
            type:PROFILE_ERROR,
            payload: { msg: err.response.statusText, status:err.response.status}
        });
    }
}

//Get profile by ID
export const getProfileByIDAction = userID => async dispatch => {
    try{
        const resp = await axios.get(`/api/profile/user/${userID}`);
        dispatch({
            type:GET_PROFILE,
            payload:resp.data
        });
    }
    catch(err){
        console.error('Error getting profile by ID', err);
        dispatch({
            type:PROFILE_ERROR,
            payload: { msg: err.response.statusText, status:err.response.status}
        });
    }
}

//Get GitHub repos
export const getGitHubReposAction = username => async dispatch => {
    try{
        const resp = await axios.get(`api/profile/github/${username}`);
        dispatch({
            type:GET_REPOS,
            payload:resp.data
        });
    }
    catch(err){
        console.error('Error getting GitHub repos ', err);
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

//Delete experience
export const deleteExperienceAction = (id) => async dispatch => {
    try{
        const resp = await axios.delete(`/api/profile/experience/${id}`);

        dispatch({
            type:UPDATE_PROFILE,
            payload:resp.data
        });
        dispatch(setAlertAction('Experience deleted!', 'success'));
    }
    catch(err){
        console.error('Error deleting experience', err);
        dispatch({
            type:PROFILE_ERROR,
            payload: { msg: err.response.statusText, status:err.response.status}
        });
    }
}

//Delete education
export const deleteEducationAction = (id) => async dispatch => {
    try{
        const resp = await axios.delete(`/api/profile/education/${id}`);

        dispatch({
            type:UPDATE_PROFILE,
            payload:resp.data
        });

        dispatch(setAlertAction('Education removed!', 'success'));
    }
    catch(err){

        console.error('Error deleting education', err);
        dispatch({
            type:PROFILE_ERROR,
            payload: { msg: err.response.statusText, status:err.response.status}
        });
    }
}

//Delete account and profile
export const deleteAccountAction = () => async dispatch => {
    if(window.confirm('Are you sure you want to delete your account? This CAN NOT be undone!')){
        try{
            await axios.delete('/api/profile/');
    
            dispatch({type:CLEAR_PROFILE});
            dispatch({type:ACCOUNT_DELETED});
    
            dispatch(setAlertAction('Your account has been permanently deleted!'));
        }
        catch(err){
            console.error('Error deleting account', err);
            dispatch({
                type:PROFILE_ERROR,
                payload: { msg: err.response.statusText, status:err.response.status}
            });
        }
    } 
}
