import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Link, withRouter } from 'react-router-dom';

import { addEducationAction } from '../../actions/profile';

const AddEducation = ({ addEducationAction, history }) => {
    const [formData, setFormData] = useState({
        school:'',
        degree:'',
        fieldOfStudy:'',
        from:'',
        to:'',
        current:true,
        description:''
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const { school, degree, fieldOfStudy, from, to, current, description } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value});

    return (
        <Fragment>
            <h1 className="large text-primary">
            Add Education
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any school or bootcamp that you have attended
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => {
                e.preventDefault();
                addEducationAction(formData, history);
            }}>
                <div className="form-group">
                    <input type="text" placeholder="* School or bootcamp" name="school" required value={school} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Degree" name="degree" required value={degree} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Field of Study" name="fieldOfStudy" value={fieldOfStudy} onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                <p> <input type="checkbox" name="current" checked={current} value={current} onChange={e => {
                    setFormData({...formData, current:!current});
                    toggleDisabled(!toDateDisabled);
                }}/> Currently Attending</p>
                </div>
                <div className="form-group">
                <h4>To Date</h4>
                    <input type="date" name="to" value={to} onChange={e => onChange(e)} disabled={current}/>
                </div>
                <div className="form-group">
                <textarea
                    name="description"
                    cols="30"
                    rows="5"
                    placeholder="Program Description"
                    value={description}
                    onChange={e => onChange(e)}
                ></textarea>
                </div>
                    <input type="submit" className="btn btn-primary my-1" />
                <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
            </form>
        </Fragment>
    )
}

AddEducation.propTypes = {
    addEducationAction: PropTypes.func.isRequired,
}

export default connect(null, { addEducationAction })(AddEducation);
