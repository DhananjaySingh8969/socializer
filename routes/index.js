const express=require('express');
const router=express.Router();

const homeController=require('../controllers/homeController');
console.log('router is running');


router.get('/',homeController.home)
router.use('/users',require('./users'));
router.use('/post',require('./post'));
router.use('/comment',require('./comment'));
router.use('/api',require('./api'));
//any further routes ,access from here
//router.use('/routerName,require('./router file))
router.use('/likes',require('./likes'));

module.exports=router;