import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: false
    },
    categories: {
        type: Array,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    post_image: {
        type: String,
        default: '',
        required: false
    }

}, { timestamps: true })

const Post = mongoose.model('Post', PostSchema)

export default Post