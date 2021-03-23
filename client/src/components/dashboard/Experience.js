import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteExperienceAction } from '../../actions/profile';

const Experience = ({ experience, deleteExperienceAction }) => {

    const experiences = experience.map(exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className="hide-sm">{exp.title}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {''}
                    {exp.to === null ? (
                        'Now'
                    ) : (
                        <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
                    )}
            </td>
            <td>
                <button onClick={() => deleteExperienceAction(exp.id)} className='btn btn-danger'>Delete</button>
            </td>
        </tr>
    ));
    return (
       <Fragment>
           <h2 className='my-2'>Experience Credentials</h2>
           <table className='table'>
               <thead>
                   <tr>
                       <th className="hide-sm">
                           Company
                       </th>
                       <th className="hide-sm">
                            Title
                       </th>
                       <th className="hide-sm">
                            Years
                       </th>
                       <th></th>
                   </tr>
               </thead>
               <tbody>
                   {experiences}
               </tbody>
           </table>
       </Fragment>
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperienceAction: PropTypes.func.isRequired,
}

export default connect(null, { deleteExperienceAction })(Experience);
