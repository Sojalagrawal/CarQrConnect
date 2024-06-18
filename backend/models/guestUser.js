const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema({
    phnNo: {
        type: Number,
        required: true,
        unique: true,
    },
}, {
    timestamps: true,
});

const Guest = mongoose.model("Guest", guestSchema);
module.exports = Guest;
