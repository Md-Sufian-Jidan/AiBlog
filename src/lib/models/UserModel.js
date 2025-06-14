import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false,
        select: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    googleId: {
        type: String,
    }
});

const UserModel = mongoose.models.user || mongoose.model('user', Schema);

export default UserModel;