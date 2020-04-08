const express=require('express');
const router=express.Router();

const homeController=require('../controllers/homeController');
console.log('router is running');


router.get('/',homeController.home)
router.use('/users',require('./users'));
//any further routes ,access from here
//router.use('/routerName,require('./router file))


module.exports=router;