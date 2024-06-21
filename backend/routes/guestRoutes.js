const express=require('express');

const router=express.Router();
const {getGuest}=require("../controllers/guestControllers");
const { protect } = require('../middleware/authMiddleware');



router.post('/',getGuest);





module.exports=router;