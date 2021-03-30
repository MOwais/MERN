import axios from 'axios';
import { setAlertAction } from './alert';
import { GET_POSTS, POST_ERROR } from './types';

//Get Posts

export const getPostsAction = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');

        dispatch({
            type:GET_POSTS,
            payload:res.data
        })
    } catch (err) {
        console.error("GET POSTS ACTION ERROR ", err);
        dispatch({
            type:POST_ERROR,
            payload: { msg: err.response.statusText, status:err.response.status}
        });
    }
}