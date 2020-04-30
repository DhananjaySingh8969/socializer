const express=require('express');
const router=express.Router();
const passport=require('passport');
const userController=require('../controllers/user_controller');
router.get('/profile/:id',userController.profile);
router.get('/post',userController.post);
router.get('/sign-in',userController.signIn);
router.get('/sign-up',userController.signUp);
router.post('/create',userController.create);
router.post('/profile/update/:id',userController.update);
// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
),userController.createSession);
router.get('/sign-out',userController.destroySession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect: '/users/sign-in'}),userController.createSession);


module.exports=router;
