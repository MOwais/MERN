import axios from 'axios';
import { setAlertAction } from './alert';
import { 
    GET_POSTS, 
    POST_ERROR, 
    UPDATE_LIKES, 
    DELETE_POST, 
    ADD_POST, 
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from './types';

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

//Remove like
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

//Delete post
export const deletePostAction = postId => async dispatch => {
    try {
        await axios.delete(`/api/posts/${postId}`);

        dispatch({
            type:DELETE_POST,
            payload: postId
        });

        dispatch(setAlertAction('Post Removed!', 'success'));

    } catch (err) {
        console.error("DELETE POST ACTION ERROR ", err);
        dispatch({
            type:POST_ERROR,
            payload: { msg: err.response.statusText, status:err.response.status}
        });
    }
}

//Add post
export const addPostAction = formData => async dispatch => {
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }

    try {
        const resp = await axios.post('/api/posts', formData, config);

        dispatch({
            type:ADD_POST,
            payload: resp.data
        });

        dispatch(setAlertAction('Post Added!', 'success'));

    } catch (err) {
        console.error("ADD POST ACTION ERROR ", err);
        dispatch({
            type:POST_ERROR,
            payload: { msg: err.response.statusText, status:err.response.status}
        });
    }
}

//Get Post
export const getPostAction = postId => async dispatch => {
    try {
        const resp = await axios.get(`/api/posts/${postId}`);

        dispatch({
            type:GET_POST,
            payload:resp.data
        });
    } 
    catch (err) {
        console.error("GET POST ACTION ERROR ", err);
        dispatch({
            type:POST_ERROR,
            payload: { msg: err.response.statusText, status:err.response.status}
        });
    }
}

//Add comment
export const addCommentAction = (postId, formData) => async dispatch => {
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }

    try {
        const resp = await axios.post(`/api/posts/comments/${postId}`, formData, config);

        dispatch({
            type:ADD_COMMENT,
            payload: resp.data
        });

        dispatch(setAlertAction('Comment Added!', 'success'));

    } 
    catch (err) {
        console.error("ADD COMMENT ACTION ERROR ", err);
        dispatch({
            type:POST_ERROR,
            payload: { msg: err.response.statusText, status:err.response.status}
        });
    }
}

//Delete comment
export const deleteCommentAction = (postId, commentId) => async dispatch => {
    try {
        const resp = await axios.delete(`/api/posts/comments/${postId}/${commentId}`);

        dispatch({
            type:REMOVE_COMMENT,
            payload: commentId
        });

        dispatch(setAlertAction('Comment Removed!', 'success'));

    } 
    catch (err) {
        console.error("REMOVE COMMENT ACTION ERROR ", err);
        dispatch({
            type:POST_ERROR,
            payload: { msg: err.response.statusText, status:err.response.status}
        });
    }
}