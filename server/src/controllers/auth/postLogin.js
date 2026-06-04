import User from "../../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const postLogin = async (req,res) =>{
    try {
        const {email , password} = req.body;
        const user = await User.findOne({ email : email.toLowerCase() });

        if(user && (await bcrypt.compare(password, user.password))){
            
            const token = jwt.sign(
                {
                    userID : (await user)._id,
                    email : email.toLowerCase()
                },
                process.env.Token_KEY,
                {
                    expiresIn : "2h"
                }
            )

            return res.status(200).json({
                userDetails : 
                {
                    username : user.username,
                    email : user.email.toLowerCase(),
                    token
                }
            })
        }

        return res.status(400).send("Invalid credentials");
    } catch (err) {
        return res.status(500).send(err);
    }
};
