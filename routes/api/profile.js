const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const Profile = require('../../models/Profile');
const Users = require('../../models/User');
const auth = require('../../middleware/auth');

//@route  GET api/profile
//@desc   Test route
//@access Public
router.get('/me', auth, async (req, res) => {
   try{
        const profile = await Profile.findOne({user:req.user.id}).populate('user',['name','avatar']);
        console.log("PROFILE", profile);
        if(!profile){
            return res.status(400).json({msg:'There is no profile for this user'});
        }

        res.json(profile);
   }
   catch(err){
       console.error("ERROR GETTING USER PROFILE ", err);
       res.status(500).send('Server Error');
   }
});

//@route  POST api/profile
//@desc   Create/update user profile
//@access private

router.post('/', [auth,
    [
        check('status','Status is required').not().isEmpty(),
        check('skills','Skills is required').not().isEmpty(),
        check('bio','Bio is required').not().isEmpty()

    ]
],
async(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    if(company)profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(githubusername) profileFields.githubusername = githubusername;
    if(status) profileFields.status = status;
    if(bio) profileFields.bio = bio;
    if(skills){
        profileFields.skills = skills.map(skill => skill.trim());
    }

    //Build social object
    profileFields.social = {};
    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(linkedin) profileFields.social.linkedin = linkedin;
    if(instagram) profileFields.social.instagram = instagram;

    console.log("PROFILE FIELDS", profileFields);
    try {
        let profile = await Profile.findOne({ user: req.user.id });

        if(profile){
            //Update profile
            profile = await Profile.findOneAndUpdate(
                {user: req.user.id}, 
                {$set: profileFields}, 
                {new: true}
            );
            return res.json(profile);
        }
        //create
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    res.send('HELLO');
});


//@route  GET api/profile
//@desc   Get ALL profiles
//@access public

router.get('/',async(req,res)=>{
    try {
        const profiles = await Profile.find().populate('user',['name','avatar']);
        res.json(profiles);
    } 
    catch (err) {
        console.error(err.message);
        res.status(500).send('Error getting all profiles');
    }
});

//@route  GET api/profile/user/:user_id
//@desc   Get profile by user id
//@access public

router.get('/user/:user_id',async(req,res)=>{
    try {
        const profile = await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar']);
        if(!profile){
            return res.status(400).json({msg:'Profile not found'});
        }
        res.json(profile);
    } 
    catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg:'Profile not found'});
        }
        res.status(500).send('Error getting user profile');
    }
});

//@route  PUT api/profile/experience
//@desc   PUT experience
//@access Private

router.put('/experience', [auth, [
    check('title','Title is required').not().isEmpty(),
    check('company','Company is required').not().isEmpty(),
    check('from','From date is required').not().isEmpty()
]], 
async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()})
    }
    
    const {title, company, location, from, to, current, description} = req.body;
    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }
    try {
        const profile = await Profile.findOne({user:req.user.id});
        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile);
    } 
    catch (err) {
       console.error(err.message);
       res.status(500).send('Error updating profile'); 
    }
});

//@route  DELETE api/profile/experience/:exp_id
//@desc   Delete experience from profile
//@access Private

router.delete('/experience/:exp_id',auth, async(req,res)=>{
    
    try {
        const profile = await Profile.findOne({user:req.user.id});
        //get remove index
        let removeIdx = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
        profile.experience.splice(removeIdx);
        await profile.save();
        res.json(profile);
    } 
    catch (err) {
       console.error(err.message);
       res.status(500).send('Error deleting profile'); 
    }
});

//@route  PUT api/profile/education
//@desc   PUT education
//@access Private

router.put('/education', [auth, [
    check('school','School is required').not().isEmpty(),
    check('degree','Degree is required').not().isEmpty(),
    check('from','From date is required').not().isEmpty(),
    check('fieldofstudy','Field of study is required').not().isEmpty()
]], 
async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()})
    }
    
    const {school, degree, fieldofstudy, from, to, current, description} = req.body;
    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }
    try {
        const profile = await Profile.findOne({user:req.user.id});
        profile.education.unshift(newEdu);
        await profile.save();
        res.json(profile);
    } 
    catch (err) {
       console.error(err.message);
       res.status(500).send('Error updating profile'); 
    }
});

//@route  DELETE api/profile/education/:edu_id
//@desc   Delete education
//@access Private

router.delete('/education/:edu_id',auth, async(req,res)=>{
    
    try {
        const profile = await Profile.findOne({user:req.user.id});
        //get remove index
        let removeIdx = profile.education.map(item => item.id).indexOf(req.params.edu_id);
        profile.education.splice(removeIdx);
        await profile.save();
        res.json(profile);
    } 
    catch (err) {
       console.error(err.message);
       res.status(500).send('Error deleting education'); 
    }
});

//@route  GET api/profile/github/:username
//@desc   GET user repos from GitHub
//@access Public

router.get('/github/:username',async(req,res)=>{
    
    try {
        const options = {
            uri:`https://api.github.com/users/${req.params.username}/repos?=per_page=5&
            sort=created:asc&client_id=${config.get('githubClientID')}
            &client_secret=${config.get('githubSecret')}`,
            method:'GET',
            headers:{'user-agent':'node.js'}
        }

        request(options,(error,response,body)=>{
            if(error)console.error(error);
            if(response.statusCode != 200)return res.status(404).json({msg:'No Github profile found'});
            res.json(JSON.parse(body));
        });
    } 
    catch (err) {
        console.error(err);
        res.status(500).send('Error getting user repos');
    }
});

module.exports = router;