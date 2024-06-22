const express=require('express');

const router=express.Router();
const {registerUser,authUser ,checkAndDecryptUser,encryptedId}=require("../controllers/userController");
const { protect } = require('../middleware/authMiddleware');



router.post('/',registerUser);
router.post('/login',authUser);
router.post('/encrypt',encryptedId);
router.post('/decrypt',checkAndDecryptUser);




module.exports=router;