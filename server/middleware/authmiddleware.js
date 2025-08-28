// middleware/auth.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

function authmiddleware(req, res, next) {
    const { access_token } = req.cookies;

    if (!access_token) {
        return res.status(401).json({ message: "to create blog , you have to login first " });
    }

    try {
        const decoded = jwt.verify(access_token, process.env.JWT_SecretKey);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = authmiddleware;
