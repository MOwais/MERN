import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getAllProfilesAction, } from '../../actions/profile';

const Profiles = ({ getAllProfilesAction, profile:{profiles, loading} }) => {
    useEffect(()=>{
        getAllProfilesAction();
    }, []);

    return (
        <Fragment>
            { loading ? <Spinner/> :
            <Fragment>
                <h1 className='large text-primary'>Developers</h1>
                <p className='lead'>
                    <i className='fab fa-connectdevelop'>Browse and connect with developers</i>
                </p>
                <div className='profiles'>
                    {profiles.length > 0 ? (
                        profiles.map(profile => {
                            return <ProfileItem key={profile._id} profile={profile}/>
                        })
                    ): <h2>No profiles found</h2>}
                </div>
            </Fragment>
            }
        </Fragment>
    );
}

Profiles.propTypes = {
    getAllProfilesAction: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getAllProfilesAction, })(Profiles);
