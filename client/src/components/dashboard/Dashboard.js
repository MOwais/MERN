import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCurrentProfileAction } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const Dashboard = props => {
    useEffect(() => {
        props.getCurrentProfileAction();
    }, []);
    //use array to only call once

    //console.log("PROPSSSSSSS", props)
    return props.loading && props.profile === null ? <Spinner/>:<Fragment>
        <h1 className='large text-primary'>Dashboard</h1>
        <p className='lead'>
            <i className='fas fa-user'></i> Welcome { props.auth.user && props.auth.user.name }
        </p>
        {props.profile.profile !== null ? <Fragment>has</Fragment>:
        <Fragment>
            <p>You have not setup a profile yet. Please add some information about youself.</p>
            <Link to='/create-profile' className='btn btn-primary my-1'>
                Create Profile
            </Link>
        </Fragment>}
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
