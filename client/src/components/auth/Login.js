import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';


export const Login = () => {
    const [formData, setFormData] = useState({
        email:'',
        password:''
    });

    const { name, email, password, confirmPassword } = formData;
    
    const onNameChange = (e) => setFormData({...formData,[e.target.name]:e.target.value})
   
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("SUCCESS");
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
            <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="register">Sign Up</Link>
            </p>
        </section>
        </Fragment>
    );
}

export default Login;