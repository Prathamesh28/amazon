import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';


dotenv.config();
const jwt_secret = process.env.JWT_SECRET;

const getToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    }, jwt_secret, {
        expiresIn: '48h'
    })
}

const isAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if(token) {
        const onlytoken = token.slice(7, token.length);
        jwt.verify(onlytoken, jwt_secret, (err, decode) => {
            if (err) {
                return res.status(401).send({msg:"Invalid Token"});
            }
            req.user = token;
            next();
            return
        })
    }
    return res.status(401).send({msg:"Token is not supplied"})
}

const isAdmin = (req,res,next) => {
    if(req.user && req.user.isAdmin){
        return next();
    }
    return res.status(401).send({msg: "Admin Token is not valid"});
}
export {getToken, isAdmin, isAuth}