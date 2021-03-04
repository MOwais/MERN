
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT 
} 
from '../actions/types';
import AsyncStorage from '@react-native-async-storage/async-storage';


let initialState = {
    token:'',
    isAuthenticated:null,
    loading:true,
    user:null
}

AsyncStorage.getItem('token').then(token => initialState.token=token);


export default (state = initialState, action) => {
    const { type, payload } = action;
    switch(type){
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                loading:false,
                user:payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            AsyncStorage.setItem('token', payload.token);
            return{
                ...state,
                ...payload,
                isAuthenticated:true,
                loading:false
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
            AsyncStorage.removeItem('token');
            return {
                ...state,
                token:null,
                isAuthenticated:false,
                loading:false
            }

        case AUTH_ERROR:
            AsyncStorage.removeItem('token');
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                loading:false
            }

        default:
            return state;
    }
}