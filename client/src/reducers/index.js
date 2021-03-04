import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';

export default combineReducers({
    alert,
    auth,
    profile
});


// const rootReducer = (state, action) => {
//     if (action.type === 'RESET_STATE') {
//         state = undefined;
//     }

//     return appReducer(state, action)
// }

// export default rootReducer;