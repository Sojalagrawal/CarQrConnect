const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Guest = require("../models/guestUser");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            // console.log(token);

            // Decode the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decoded);

            // Check if the user exists in User or Guest collection
            req.user = await User.findById(decoded.id).select("-password") || await Guest.findById(decoded.id).select("-password");

            if (!req.user) {
                res.status(401);
                throw new Error("Not authorized abc");
            }

            next();
        } catch (err) {
            res.status(401);
            throw new Error("Not authorized");
        }
    } else {
        // console.log("no token");
        res.status(401);
        throw new Error("No token provided haha");
    }
});

module.exports = { protect };
