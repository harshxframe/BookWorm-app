import mongoose from "mongoose";


const authSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        required: true,
        unique: true,
        type: String
    },
    password: {
       required:true,
       type: String
    },
}, {
    timestamps: true
});


const auth = mongoose.model("User", authSchema);

export default auth;