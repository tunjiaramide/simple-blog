import express from 'express';
import User from '../models/User.js'

const router = express.Router()

// get all users
router.get('/users', async (req, res) => {
    try {
        const allAuthors = await User.find({}).exec()
        res.status(200).json(allAuthors)
    } catch(err) {
        res.status(500).send(err)
    }
})


export default router
