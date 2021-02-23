import { v4 as uuidv4 } from 'uuid'
import axios from 'axios';

import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL } from './types';
import { setAlertAction } from './alert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import setAuthToken from '../utils/setAuthToken';

//load user
export const loadUserAction = () => async dispatch =>{
    AsyncStorage.getItem('token').then(token=>{
        if(token)setAuthToken(token);
    });

    try{
        const res = await axios.get('/api/auth');
        dispatch({
            type:USER_LOADED,
            payload:res.data
        });
    }
    catch(err){
        console.error('load user action', err);
        dispatch({
            type:AUTH_ERROR
        });
    }
}


//Register user
export const registerUserAction = ({ name, email, password }) => async dispatch => {

    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const submitData = JSON.stringify({ name, email, password });
    try{
        const res = await axios.post('api/users', submitData, config);
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        });
        dispatch(setAlertAction('Successfully Registered!', 'success'));
        dispatch(loadUserAction());
    }
    catch(err){
        const errors = err.response.data.errors;
        console.log("REGISTER FAIL ERRORS", errors);
        if(errors){
            errors.forEach(error => dispatch(setAlertAction(error.msg,'danger')))
        }
        dispatch({
            type:REGISTER_FAIL
        });
    }
}

//Login user
export const loginUserAction = (email, password) => async dispatch => {

    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const submitData = JSON.stringify({ email, password });
    try{
        const res = await axios.post('api/auth', submitData, config);
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        });
        dispatch(loadUserAction());
        //dispatch(setAlertAction('Successfully Lo!', 'success'))
    }
    catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlertAction(error.msg,'danger')))
        }
        dispatch({
            type:LOGIN_FAIL
        });
    }
}