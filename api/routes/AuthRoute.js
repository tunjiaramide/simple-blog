import express, { response } from 'express';
import User from '../models/User.js';
import bcrypt  from 'bcrypt';

const router = express.Router()


router.post('/register', async(req, res) => {
    const { username, email, password, profile_image } = req.body
    
    // check if username already exists
    const user = await User.findOne({ username: username}).exec()
    if(user) return res.send({"msg": "Username exists"})

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
        username, 
        email, 
        password: hashedPassword, 
        profile_image
    })

    try {
        const data = await newUser.save();
        console.log(data);
        res.status(201).send({"msg": "User created successfully", data})
    } catch(err) {
        console.log(err)
        res.status(500).send({"msg": "Unsuccessful"})
    }
})


router.post('/login', (req, res) => {
    res.send('Login route')
})


export default router
