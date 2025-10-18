// server/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

// Use your secret key from env
const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_key";

module.exports = function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = { id: decoded.id };
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};
