import React, { Fragment, useState } from 'react'

export const Register = () => {
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:''
    });

    const { name, email, password, confirmPassword } = formData;
    
    const onNameChange = (e) => setFormData({...formData,[e.target.name]:e.target.value})
    const onSubmit = (e) => {
        e.preventDefault();
        if(password!=confirmPassword){
            console.error('PASSWORDS DO NOT MATCH')
        }
        else{
            console.log('FORM DATA', formData);
        }
    }
    return (
        <Fragment>
        <section className="container">
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={e=>onSubmit(e)}>
            <div className="form-group">
                <input 
                    type="text" 
                    placeholder="Name" 
                    name="name" 
                    value={name}
                    onChange={e => onNameChange(e)}
                    required 
                />
            </div>
            <div className="form-group">
                <input 
                    type="email" 
                    placeholder="Email Address" 
                    name="email" 
                    onChange={e => onNameChange(e)}
                    required
                />
                <small className="form-text"
                >This site uses Gravatar so if you want a profile image, use a
                Gravatar email</small
                >
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
            <div className="form-group">
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    minLength="6"
                    onChange={e => onNameChange(e)}
                    required 
                />
            </div>
            <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <a href="login.html">Sign In</a>
            </p>
        </section>
        </Fragment>
    );
}

export default Register;