import axios from 'axios';
import { setAlertAction } from './alert';
import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from './types';

//Get Posts

export const getPostsAction = () => async dispatch => {
    try {
        const resp = await axios.get('/api/posts');

        dispatch({
            type:GET_POSTS,
            payload:resp.data
        })
    } catch (err) {
        console.error("GET POSTS ACTION ERROR ", err);
        dispatch({
            type:POST_ERROR,
            payload: { msg: err.response.statusText, status:err.response.status}
        });
    }
}

//Add like

export const addLikesAction = postId => async dispatch => {
    try {
        const resp = await axios.put(`/api/posts/like/${postId}`);

        dispatch({
            type:UPDATE_LIKES,
            payload:{
                postId,
                likes:resp.data
            }
        })
    } catch (err) {
        console.error("UPDATE LIKE ACTION ERROR ", err);
        dispatch({
            type:POST_ERROR,
            payload: { msg: err.response.statusText, status:err.response.status}
        });
    }
}

//Add like

export const removeLikesAction = postId => async dispatch => {
    try {
        const resp = await axios.put(`/api/posts/unlike/${postId}`);

        dispatch({
            type:UPDATE_LIKES,
            payload:{
                postId,
                likes:resp.data
            }
        })
    } catch (err) {
        console.error("REMOVE LIKE ACTION ERROR ", err);
        dispatch({
            type:POST_ERROR,
            payload: { msg: err.response.statusText, status:err.response.status}
        });
    }
}