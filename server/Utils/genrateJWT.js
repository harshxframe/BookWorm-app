import jwt from "jsonwebtoken";


export const generateToken = (userData) => {
    try {
        const token = jwt.sign(userData, process.env.JWT_SECRET)
        if (token) {
            return { "error": false, "token": token }
        } else {
            return { "error": true, "token": "" }
        }
    } catch (e) {
                console.log("Hello",e);
        return { "error": true, "token": "" }
    }


}

