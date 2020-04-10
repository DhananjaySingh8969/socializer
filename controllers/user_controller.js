const User=require('../models/user');
module.exports.profile=function(req,res){
    if(req.cookies.user_id)
    {
            User.findById(req.cookies.user_id,function(err,user){
                    if(err)
                    {
                        console.log('error in finding user by cookies id');
                        res.redirect('/users/sign-in');
                        return ;
                    }
                    return res.render('user_profile.ejs',{
                        user:user
                    });
            });
    }else{
        return res.redirect('/users/sign-in');
    }
    // 
}
module.exports.post=function(req,res){
    return res.render('../views/user_post.ejs',{});
}
module.exports.signIn=function(req,res){
    // console.log(1);
    if(req.cookies.user_id)
    {      
            User.findById(req.cookies.user_id,function(err,user){
                    
                    if(err)
                    {
                        // console.log(3);
                        console.log('error in finding user by cookies id');
                        return res.render('user_sign_in');
                        return ;
                    }
                    console.log(4);
                    return res.redirect('/users/profile');
            });
    }else{
        // console.log(5);
        return res.render('user_sign_in');
    }
    // console.log(6);
    
}
module.exports.signUp=function(req,res)
{    
    // console.log(1);
    if(req.cookies.user_id)
    {        
            User.findById(req.cookies.user_id,function(err,user){
                    
                    if(err)
                    {
                        // console.log(3);
                        console.log('error in finding user by cookies id');
                        return res.redirect('/users/sign-in');
                        return ;
                    }
                    // console.log(4);
                    return res.redirect('/users/profile');
            });
    }else{
        // console.log(5);
        return res.render('../views/user_sign_up',{
            title:"socializer/sign-Up"
        })
    }
    // console.log(6);
   
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
            return;
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
      //steps to mannual authentication
      //find the user
      User.findOne({email:req.body.email},function(err,user){
            if(err)
            {   
                console.log('error in finding user in sign in');
                return ;
            }
            //user found
            if(user)
            {
                
                //user password doesnt match
                if(user.password!=req.body.password)
                {   
                    console.log('users password is wrong');
                    return res.redirect('/users/sign-in');
                }
                //creating user session
                res.cookie('user_id',user.id);
                return res.redirect('/users/profile');
            }
            else
            {
                 //user deoes not found
                 console.log('user doesnt have an account'); 
                 return res.redirect('/users/sign-up');
            }
      });
      
      
}

//user sign-out
module.exports.signOut=function(req,res){
        // res.cookie('user_id',null);
        res.clearCookie("user_id");
        console.log('user has been signed out');
        return res.redirect('/users/sign-in');
}