import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logoutAction } from '../../actions/auth';

export const Navbar = props => {

    const authLinks = (
        <ul>
            <li><Link to='/profiles'>Developers</Link></li>
            <li><Link to='/posts'>Posts</Link></li>
            <li><Link to='/dashboard'>
                <i className="fas fa-user"></i>{' '}
                <span className='hide-sm'>Dashboard</span></Link>
            </li>
            <li>
                <a onClick={props.logoutAction} href='#!'>
                    <i className="fas fa-sign-out-alt"></i>{' '}
                    <span className='hide-sm'>Logout</span>
                </a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
          <li><Link to='/profiles'>Developers</Link></li>
          <li><Link to='/register'>Register</Link></li>
          <li><Link to='/login'>Login</Link></li>
        </ul>
    );

    return (
        <nav className="navbar bg-dark">
        <h1>
          <Link to='/'><i className="fas fa-code"></i> DevConnector</Link>
        </h1>
        { !props.auth.loading && (<Fragment>{ props.auth.isAuthenticated ? authLinks:guestLinks }</Fragment>)}
      </nav>
    );
}

Navbar.propTypes = {
    logoutAction: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth:state.auth
});

export default connect(mapStateToProps,{ logoutAction })(Navbar);