import React from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({profile:{bio,skills,user:{name}}}) => 
    // console.log("SKILLS");
    (
        <div className="profile-about bg-light p-2">
            <h2 className="text-primary">{name.trim().split(' ')[0]}'s Bio</h2>
            <p>{bio}</p>
            <div className="line"></div>
            <h2 className="text-primary">Skill Set</h2>
            <div className="skills">
            {skills.split(',').map((skill,index)=>(
                <div key={index} className='p-1'>
                    <i className='fas fa-check'/>{skill}
                </div>
            ))}
            </div>
        </div>
    )


ProfileAbout.propTypes = {

}

export default ProfileAbout;
