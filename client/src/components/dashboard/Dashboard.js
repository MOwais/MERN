import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrentProfileAction } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const Dashboard = props => {
    useEffect(() =>{
        props.getCurrentProfileAction();
    }, []);
    //use array to only call once
    return props.loading && props.profile === null ? <Spinner/>:<Fragment>
        <h1 className='large text-primary'>Dashboard</h1>
        <p className='lead'>
            <i className='fas fa-user'></i> Welcome { props.auth.user && props.auth.user.name }
        </p>
        {props.profile !== null ? <Fragment>has</Fragment>:<Fragment>has not</Fragment>}
    </Fragment>
}

Dashboard.propTypes = {
    getCurrentProfileAction: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth:state.auth,
    profile:state.profile,
})

export default connect(mapStateToProps, { getCurrentProfileAction })(Dashboard);
