const asyncHandler = require("express-async-handler");
const Guest = require('../models/guestUser');
const generateToken = require("../config/generateToken");

const getGuest = asyncHandler(async (req, res) => {
    const { phnNo } = req.body;

    // Validate phone number
    if (!phnNo) {
        res.status(400);
        throw new Error("Please enter a valid Phone Number");
    }

    const guestExists = await Guest.findOne({ phnNo });

    if (guestExists) {
        res.status(200).json({
            _id: guestExists.id,
            token: generateToken(guestExists._id),
        });
    } else {
        const guest = await Guest.create({ phnNo });

        if (guest) {
            res.status(200).json({
                _id: guest.id,
                token: generateToken(guest._id),
            });
        } else {
            res.status(400);
            throw new Error("Failed to create guest");
        }
    }
});



module.exports = { getGuest};
