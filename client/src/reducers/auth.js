
import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';
import AsyncStorage from '@react-native-async-storage/async-storage';


const initialState = {
    token:AsyncStorage.getItem('token'),
    isAuthenticated:null,
    loading:true,
    user:null
}

export default function(state = initialState, action){
    const { type, payload } = action;
    switch(type){
        case REGISTER_SUCCESS:
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

        default:
            return state;
    }
}