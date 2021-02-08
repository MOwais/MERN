const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');

//@route  POST api/auth
//@desc   Test route
//@access Public

router.get('/', auth, async (req,res)=>{
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/',[
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const { email, password } = req.body;

    try{
        let user = await User.findOne({email});
        console.log("USER", user);
        
        if(!user){
            return res.status(400).json({errors:[{msg:'Invalid credentials'}]});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({errors: [{msg:'Invalid credentials'}] });
        }

        const payload = {
            user:{
                id:user.id
            }
        };

        console.log("CALLED")
        jwt.sign(
            payload,
            config.get("jwtSecret"),
            {expiresIn:3600000},
            (err,token)=>{
                if(err)throw err;
                console.log("TOKEN", token);
                res.json({ token })
            }
        );
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }

    console.log("REQUEST.BODY", req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    //see if email already exists

    //get user gravatar

    //encrypt password using bcrypt

    //return jwt


    //res.send('User route')
});

module.exports = router;