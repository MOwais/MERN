import { v4 as uuidv4 } from 'uuid'
import axios from 'axios';

import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';
import { setAlertAction } from './alert';

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
        dispatch(setAlertAction('Successfully Registered!', 'success'))
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