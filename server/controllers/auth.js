import mongoose from "mongoose";
import { apiResponse } from "../Utils/apiResponse.js";
import auth from "../models/auth.js";
import { generateToken } from "../Utils/genrateJWT.js";

export const createAccount = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.send(apiResponse(true, {}, "Value not found", 401));
        } else {
            //const authModel = mongoose.model("User", auth);
            const data = await auth.findOne({ "email": email });
            if (data) {
                return res.send(apiResponse(true, {}, "user already exist", 401));
            } else {
                //create the user.
                const Userdata = await auth.create({ username, email, password });
                if (Userdata) {
                    const getToken = generateToken({ username: Userdata.username, email: Userdata.email });
                    if (getToken.error) {
                        return res.send(apiResponse(true, {}, "User creation failed", 501));
                    } else {
                        const token = getToken.token;
                        return res.send(apiResponse(false, { "token": token.toString() }, "user created successfully", 201));
                    }
                } else {
                    return res.send(apiResponse(true, {}, "user creation failed!", 501));
                }
            }
        }
    } catch (e) {
        res.send("custom error on account creation" + e);
    }
}

export const loginAccount = async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.send(apiResponse(true, {}, "Payload not satisfied", 401));
        } else {
            const userData = await auth.findOne({ email });
            if (userData) {
                // Check passoword
                if (password.toString() === userData.password.toString()) {
                    const getToken = generateToken({ "username": userData.username, "email": userData.email });
                    if (getToken.error) {
                        return res.send(apiResponse(true, { "token": "" }, "User logged failed, Server error", 201));
                    } else {
                        return res.send(apiResponse(false, { "token": getToken.token }, "User logged successfull", 201));
                    }
                } else {
                    return res.send(apiResponse(false, { "token": "" }, "Password does not match", 401));
                }
            } else {
                return res.send(apiResponse(true, { "token": "" }, "user Does not exsist", 201));
            }
        }
    } catch (e) {
        return res.send(apiResponse(true, { "token": "" }, "Server error"+e, 501));
    }
}