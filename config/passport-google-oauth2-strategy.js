const passport=require('passport');
const User=require('../models/user');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');

const v={"web":
   {"client_id":"351776873665-41ecj4a799kfesrpnvvuib2ukrqll05m.apps.googleusercontent.com",
    "project_id":"socializer-275817",
    "auth_uri":"https://accounts.google.com/o/oauth2/auth",
    "token_uri":"https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
    "client_secret":"CX957cquKheFrfS2_15r2_sm",
    "redirect_uris":["http://localhost:8000/users/auth/google/callback"],
    "javascript_origins":["http://localhost:8000"]
   }
}

//tell passport to use google login
passport.use(new googleStrategy({
        clientID:"351776873665-41ecj4a799kfesrpnvvuib2ukrqll05m.apps.googleusercontent.com",
        clientSecret:"CX957cquKheFrfS2_15r2_sm",
        callbackURL:"http://localhost:8000/users/auth/google/callback"
    },
    function(accesssToken,refreshToken,profile,done)
    {   
        //find the user
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){console.log('error in google strategy',err);return ;}
            // console.log(profile);
            if(user)
            {     
                //set found user to req.user
                return done(null,user);
            }else{
                //if user not found then create user and set to req.user
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex'),
                    avatar:User.avatarPath+'/default.png'
                },function(err,user){
                    if(err){console.log('error in creating user in google strategy',err);return ;}
                    return done(null,user);    
                });
            }
        });
    }
));


module.exports=passport;