import express from 'express';
import User from '../models/User.js'
import auth from '../lib/auth.js';


const router = express.Router()

// get all users
router.get('/', async (req, res) => {
    try {
        const allAuthors = await User.find({}).exec()
        res.status(200).json(allAuthors)
    } catch(err) {
        res.status(500).send(err)
    }
})


router.put('/:id', auth, async (req, res) => {

    if (!req.username) return res.status(403).send({ "msg": "No access"})
    
    console.log(req.username)
    res.send('You have access')
    

})


export default router
