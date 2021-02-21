
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR } from '../actions/types';
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
            console.log("PAYLOAD", payload)
            AsyncStorage.setItem('token', payload.token);
            return{
                ...state,
                ...payload,
                isAuthenticated:true,
                loading:false
            }
        case REGISTER_FAIL:
            AsyncStorage.removeItem('token');
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                loading:false
            }

        case AUTH_ERROR:
            alert("AUTH ERROR CALLED")
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