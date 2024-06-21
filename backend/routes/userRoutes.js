const express=require('express');

const router=express.Router();
const {registerUser,authUser,decryptedId ,encryptedId,checkUser}=require("../controllers/userController");
const { protect } = require('../middleware/authMiddleware');



router.post('/',registerUser);
router.post('/login',authUser);
router.post('/encrypt',encryptedId);
router.post('/decrypt',decryptedId);
router.post('/check',checkUser);



module.exports=router;