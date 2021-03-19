import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCurrentProfileAction } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import profile from '../../reducers/profile';

const Dashboard = ({
    getCurrentProfileAction,
    auth: { user },
    profile: { profile, loading }
}) => {
    useEffect(() => {
        getCurrentProfileAction();
    }, []);
    //use array to only call once

    console.log("PROFILE ====>>>", profile);

    return loading && profile === null ? <Spinner/>:<Fragment>
        <h1 className='large text-primary'>Dashboard</h1>
        <p className='lead'>
            <i className='fas fa-user'></i> Welcome { user && user.name }
        </p>
        {profile !== null ? 
        <Fragment>
            <DashboardActions/>
            <Experience experience = {profile.experience}/>
            <Education education = {profile.education}/>
        </Fragment>:
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
