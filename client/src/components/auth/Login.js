import React, { Fragment, useState } from 'react';
import { Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { loginUserAction } from '../../actions/auth';


export const Login = props => {
    const [formData, setFormData] = useState({
        email:'',
        password:''
    });

    const { name, email, password, confirmPassword } = formData;
    
    const onNameChange = (e) => setFormData({...formData,[e.target.name]:e.target.value})
   
    const onSubmit = async (e) => {
        e.preventDefault();
        props.loginUserAction(email,password);
    }


    if(props.isAuthenticated){
        return <Redirect to="/dashboard"/>;
    }
    
    return (
        <Fragment>
        <section className="container">
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
            <form className="form" onSubmit={e=>onSubmit(e)}>
            <div className="form-group">
                <input 
                    type="email" 
                    placeholder="Email Address" 
                    name="email" 
                    onChange={e => onNameChange(e)}
                    required
                />
            </div>
            <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    minLength="6"
                    onChange={e => onNameChange(e)}
                    required 
                />
            </div>
            <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="register">Sign Up</Link>
            </p>
        </section>
        </Fragment>
    );
};

Login.propTypes = {
    loginUserAction: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated:state.auth.isAuthenticated
});

export default connect(mapStateToProps, { loginUserAction })(Login);