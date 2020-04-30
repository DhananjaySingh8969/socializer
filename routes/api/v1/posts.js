const express=require('express');
const router=express.Router();
const passport=require('passport');
const postApiController=require('../../../controllers/api/v1/posts_api');
router.get('/',postApiController.index);
router.get('/delete/:id',passport.authenticate('jwt',{session:false}),postApiController.destroy);
module.exports=router;