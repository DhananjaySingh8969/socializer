const User=require('../models/user');
module.exports.profile=function(req,res){
    return res.render('../views/user_profile.ejs',{});
}
module.exports.post=function(req,res){
    return res.render('../views/user_post.ejs',{});
}
module.exports.signIn=function(req,res){
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    return res.render('../views/user_sign_in.ejs',{
        title:"socializer/sign-in"
    });
}
module.exports.signUp=function(req,res)
{   
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    return res.render('../views/user_sign_up',{
        title:"socializer/sign-Up"
    })
}

//user create
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user)
    {
        if(err)
        {
            console.log('error in finding user in signing up'); 
            return
        }

        if (!user)
        {
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}
                console.log('account has been created');
                return res.redirect('/users/sign-in');
            })
        }else{
            console.log('user already exist');
            return res.redirect('back');
        }

    });
}

//user sign in create a session
module.exports.createSession=function(req,res){
       return res.redirect('/');
}