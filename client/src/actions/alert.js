import uuid from 'uuid/v4';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlertAction = (msg, alertType) => dispatch => {
    const id = uuid.v4();
    dispatch({
        type:SET_ALERT,
        payload:{
            msg, 
            alertType,
            id
        }
    });
}