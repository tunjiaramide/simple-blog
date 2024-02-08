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

    // get the params id
    const id = req.params.id;

    try {
        // find user
        const user = await User.findById({ _id: id})

        // check if user can edit profile
        if (user.username !== req.username) return res.status(403).send({"msg": "You dont have access to edit this profile"})

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: { ...req.body }},
            { new: true }
            )
        res.status(200).json(updatedUser)
    }catch(err){
        res.status(500).json(err.message)
    }
    

})


export default router
