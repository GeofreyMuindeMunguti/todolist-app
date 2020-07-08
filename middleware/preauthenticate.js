var environnment = require('dotenv').config();
var secrete = process.env.SECRETE

module.exports = function authenticate(req, res, next) {
    if(req.headers.secrete){
        // compare secrete passed in headers with the one in the environment variables
        if(req.headers.secrete == secrete){
            return next();
        }
        res.status(500).json({"message":"Unauthorized"})
    }else{
        res.status(500).json({"message":"Unauthorized"})
    }
}