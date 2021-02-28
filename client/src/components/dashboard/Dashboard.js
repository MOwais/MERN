import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfileAction } from '../../actions/profile';

const Dashboard = props => {
    useEffect(() =>{
        props.getCurrentProfileAction();
    }, []);
    //use array to only call once
    return <div>Dashboard </div>
}

Dashboard.propTypes = {
    getCurrentProfileAction: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth:state.auth,
    profile:state.profile
})

export default connect(mapStateToProps, { getCurrentProfileAction })(Dashboard);
