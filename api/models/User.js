import { Schema} from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile_image: {
        type: String,
        default: '',
        required: false
    },


}, { timestamps: true })

const User = mongoose.model('User', UserSchema)

export default User