import express from 'express'
import User from '../models/userModel'
import { getToken } from '../util';


const router = express.Router();

router.post('/signin',async (req, res) => {
    const signInUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if(signInUser){
        res.send({
            _id: signInUser._id,
            name: signInUser.name,
            email: signInUser.email,
            isAdmin: signInUser.isAdmin,
            token: getToken(signInUser)
        })
    } else{
        res.status(401).send({message: 'Invalid Email or Password'})
    }
})

router.post('/register',async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    const newUser = await user.save();
    
    if(newUser){
        res.send({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser)
        })
    } else{
        res.status(401).send({message: 'Invalid User data'})
    }
})


router.get("/createadmin", async (req,res) => {
    try {
        const user = new User({
            name:'Pratham',
            email: 'pratham@gmail.com',
            password: '1234',
            isAdmin: true
        });
    
        const newUser = await user.save();
        res.send(newUser);
        
    } catch (error) {
        res.send({msg: error.message})
    }
    
})

export default router;