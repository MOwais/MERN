import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getPostAction } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';

const Post = ({ getPostAction, post: { post, loading }, match }) => {
    useEffect(()=>{
        getPostAction(match.params.id)
    }, [getPostAction]);
    console.log("POSTSSSSS", post);
    return loading || post === null ? <Spinner /> : <Fragment>
        <Link to='/posts' className='btn'>
            Back to posts
        </Link>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post._id} />
        <div className='comments'>
            {post.comments.map(comment => (
                <CommentItem key={comment._id} comment={comment} postId={post._id} />
            ))}
        </div>
    </Fragment>
}

Post.propTypes = {
    getPostAction: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, {getPostAction})(Post);
