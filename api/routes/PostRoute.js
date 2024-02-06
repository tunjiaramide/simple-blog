import express from 'express';
import Post from '../models/Post.js'

const router = express.Router()


// create new post
router.post('/', async (req, res) => {
    
    // check if title is unique
    const checkTitle = await Post.findOne({ title: req.body.title }).exec()
    if (checkTitle) return res.status(401).send({ "msg": "Title exists"})

    // create post
    const newPost = new Post({
        ...req.body
    })

    try {
        await newPost.save()
        res.status(200).send({"msg": "Post created"})

    } catch(err) {
        res.status(500).json(err)
    }
})


// get all posts
router.get('/', async(req, res) => {
    try {
        const allPosts = await Post.find({}).exec()
        res.status(200).json(allPosts)
    } catch(err) {
        res.status(500).send(err)
    }
})


// get single post
router.get('/:id', async(req, res) => {
    // get the params id
    const id = req.params.id;

    // find post with single id
    try {
        const singlePost = await Post.findById({ _id: id})
        res.status(200).json(singlePost)
    }catch(err){
        res.status(500).json(err.message)
    }
    
})


// edit single post
router.put('/:id', async(req, res) => {
    // get the params id
    const id = req.params.id;

    try {
        const singlePost = await Post.findById({ _id: id})
        // check if post belongs to user
        if (singlePost.username !== req.body.username) return res.status(403).send({"msg": "You dont have access to edit this post"})

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { $set: { ...req.body }},
            { new: true }
            )
        res.status(200).json(updatedPost)
    }catch(err){
        res.status(500).json(err.message)
    }
    
})


// delete single post
router.delete('/:id', async(req, res) => {
    // get the params id
    const id = req.params.id;

    try {
        const singlePost = await Post.findById({ _id: id})
        // check if post belongs to user
        if (singlePost.username !== req.body.username) return res.status(403).send({"msg": "You dont have access to delete this post"})

        await Post.findByIdAndDelete(id)
        res.status(200).send({"msg": "Post deleted"})
    }catch(err){
        res.status(500).json(err.message)
    }
    
})






export default router
