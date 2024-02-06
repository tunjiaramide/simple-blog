import express from 'express';
import Category from '../models/Category.js'

const router = express.Router()

router.post('/', async (req, res) => {
    const { name } = req.body;

    // check if category exists
    const checkCategory = await Category.findOne({ name: name }).exec()
    if (checkCategory) return res.status(401).send({ "msg": "Category exists"})

    const newCategory = new Category({ name })
    try {
        await newCategory.save()
        res.status(201).send({ "msg": "Category created"})
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get('/', async(req, res) => {
    try {
        const allCategory = await Category.find({}).exec()
        res.status(200).json(allCategory)
    } catch(err) {
        res.status(500).send(err)
    }
})




export default router
