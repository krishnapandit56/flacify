const jwt = require('jsonwebtoken')
require('dotenv').config({path:'../env files/.env'})
const secretkey = process.env.secretkey

function verifyToken(req,res,next){
    const token = req.cookies.token

    if(!token){
        
        console.log('token not provided !!')
        return res.status(401).json({ message: 'Token not provided !!' });
    }
    try{
        const decoded = jwt.verify(token,secretkey)
        req.username = decoded.username;
        console.log('token verified sucessfully !!')
        next();
    }
    catch(err){
        res.json({message:'invalid token !!'})
    }
}

module.exports = verifyToken;