const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user');

//authentication using passport-local
passport.Strategy(new LocalStrategy({
       usernameField:'email'
     },
     function(email,password,done)
     {
         //find the user and establish the identity
         User.findOne({email:email},function(err,user){
                if(err)
                {   
                    console.log('error in finding user-->passport')
                    return done(err);
                }
                if(!user || user.password!=password)
                {
                    //user password is wrong(invalid password)
                    onsole.log('user password is wrong(invalid password)'); 
                    return done(null,false);
                }
                //user password is correct
                return done(null,user);
         });
     }
));

//serializing the user to decide which is to kept in cookie
passport.serializeUser(function(user,done){
     done(null,user.id);
});

//deserializing the user form the key in the cookies
passport.deserializeUser(function(id,done){
        User.findOne(id,function(err,user){
                if(err)
                {   
                    console.log('error in finding user-->passport')
                    return done(err);
                }
                return done(null,user);
        });
});