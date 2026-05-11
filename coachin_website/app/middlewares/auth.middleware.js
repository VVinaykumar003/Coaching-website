const jwt = require("jsonwebtoken")

const authMiddleware = (req,res,next)=>{
    try {
        const header = req.headers.authorization;

        if(!header){
            res.status(401).json({
                message:"No token,Please login again."
            })
        }

        const token = header.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = authMiddleware;