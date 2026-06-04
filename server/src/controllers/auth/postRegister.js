import User from "../../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Channel from "../../models/Channel.js";

export const postRegister = async(req,res) =>{
    try{
        const {username ,password ,email} = req.body;

        const userExists = await User.exists({email});

        if(userExists){
            return res.status(402).send("E-mail is already in use");
        }

        const encryptedPassword = await bcrypt.hash(password , 10);

        const newChannel = await Channel.create({});

        const user = await User.create({
            username,
            email : email.toLowerCase(),
            password : encryptedPassword,
            channel: newChannel._id,
        })

        const token = jwt.sign(
            {
                userID : user._id,
                email : email.toLowerCase()
            },
            process.env.Token_KEY,
            {
                expiresIn : "2h"
            }
        )
        return res.status(201).json({
            userDetails : {
                email : email.toLowerCase(),
                username,
                token,
            }
        })
        
    } catch (err) {
        console.log(err);
        return res.status(500).send('error registering user');
    }
}