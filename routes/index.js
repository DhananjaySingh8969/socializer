const express=require('express');
const router=express.Router();

const homeController=require('../controllers/homeController');
console.log('router is running');
module.exports=router;

router.get('/',homeController.home);