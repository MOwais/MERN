const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next){
    //Get token from header
    let token = req.header('x-auth-token');
    console.log("MIDDLEWARE CALLED>>>>>>>>>>>>>>>>>")
    //check if no token
    if(!token){
        return res.status(401).json({msg:'No token. Authorization denied'});
    }

    //Verify token
    try{
        let decoded = jwt.verify(token,config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    }
    catch(err){
        res.status(401).json({msg:'Token is not valid'});
        console.error(err);
    }
}