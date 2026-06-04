import jwt from "jsonwebtoken";

const config = process.env;

export const verifyToken = (req, res, next) => {
    let token = req.body?.token || req.query?.token || req.headers["authorization"];
    
    if(!token){
        return res.status(401).send("A token is required for authentication");
    }

    try {
        token = token.replace(/^Bearer\s+/, ""); // geneally in form of "Bearer hdisudsnbdbsvijdusb"
        
        const decoded = jwt.verify(token, config.Token_KEY);
        req.user = decoded; // now user has email and username
        //console.log(decoded);

    } catch (err) {
        return res.status(401).send("Invalid Token");
    }

    return next();
}