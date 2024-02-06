import express   from 'express';
import User from '../models/User.js';
import bcrypt  from 'bcrypt';
import jwt from 'jsonwebtoken';

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


router.post('/login', async (req, res) => {

    const { username, password } = req.body

    // check if username already exists
    const user = await User.findOne({ username: username}).exec()
    if(!user) return res.status(401).send({"msg": "User does not exist please register"})


    // check if password is correct
    const checkPassword = await bcrypt.compare(password, user.password)
    if(!checkPassword) return res.status(403).send({"msg": "Wrong credentials"})

    // send the client token for access
    jwt.sign({ username}, process.env.SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
        if (err) return res.status(500)
        res.status(200).send({ token: token })
    })
})


export default router
