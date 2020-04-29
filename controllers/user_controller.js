const User=require('../models/user');
const path=require('path');
const fs=require('fs');
module.exports.profile=async function(req,res){
      
    try{
        let user=await User.findById(req.params.id);
        return res.render('../views/user_profile.ejs',{all_user:user});
    }catch(err)
    {   
         req.flash('error',err);
        return ;
    }
    
}
module.exports.post=function(req,res){
    return res.render('../views/user_post.ejs',{});
}
module.exports.signIn=function(req,res){
    if(req.isAuthenticated())
    {   
        req.flash('error','you have already logged in!');
        return res.redirect(`/users/profile/${req.user.id}`);
    }else{
        return res.render('../views/user_sign_in.ejs',{
            title:"socializer/sign-in"
        });
    }
    
}
module.exports.signUp=function(req,res)
{   
    if(req.isAuthenticated())
    {    
        req.flash('error','you have already logged in!');
        return res.redirect(`/users/profile/${req.user.id}`);
    }
    return res.render('../views/user_sign_up',{
        title:"socializer/sign-Up"
    })
}

//user create
module.exports.create =async function(req, res){
    if (req.body.password != req.body.confirm_password){
        
        req.flash('error','confirm password didnt match with password!');
        return res.redirect('back');
    }
    try{
        let user=await User.findOne({email: req.body.email});
        if (!user)
        {
            let createdUser=await User.create(req.body);
            // console.log('account has been created');
            req.flash('success','you have signed up successfully!');
            return res.redirect('/users/sign-in');
        }
        // console.log('user already exist');
        req.flash('error','user already exist!');
        return res.redirect('back');
    }catch(err)
    {
       req.flash('error',err);
       return ;
    }
    
}

//user sign in create a session
module.exports.createSession=function(req,res){
       req.flash('success','logged in successfully!');
       return res.redirect('/');
}
module.exports.destroySession=function(req,res)
{   
    req.logout();
    req.flash('success','you have logged out!');
    return res.redirect('/');
}
module.exports.update=async function(req,res)
{   
    // console.log(req.body);
    // if(req.user && req.user.id==req.params.id)
    // { 
    //     try{
    //         let user=await User.find({email:req.body.email});
    //         if(user && user.length && user[0].email!=req.user.email)
    //         {   
    //             req.flash('error','Email already exist!');
    //             return res.redirect('back');
    //         }  
    //         let updatedUser=await User.findByIdAndUpdate(req.params.id,req.body);
    //         req.flash('success','profile has been update successfully!');
    //         return res.redirect('back');  
    //     }catch(err)
    //     {
    //         req.flash('error',err);
    //        return ;
    //     }       
    // }else{
    //     req.flash('error','Unautherized');
    //     return res.redirect('back');
    // }
    //user profile update with avatar
    if(req.user && req.user.id==req.params.id)
    { 
        try{
            let user=await User.find({email:req.body.email});
            if(user && user.length && user[0].email!=req.user.email)
            {   
                req.flash('error','Email already exist!');
                return res.redirect('back');
            } 
            // console.log(user); 
            let userToBeUpdated=await User.findById(req.params.id);
            User.uploadAvatar(req,res,function(err){
                 if(err){console.log('*** MULTER ERROR',err); return ;}
                 userToBeUpdated.name=req.body.name;
                 userToBeUpdated.email=req.body.email;
                 if(fs.existsSync(path.join(__dirname,'..',userToBeUpdated.avatar)) && userToBeUpdated.avatar){
                     fs.unlinkSync(path.join(__dirname,'..',userToBeUpdated.avatar));
                 }
                 if(req.file){
                    userToBeUpdated.avatar=User.avatarPath+'/'+req.file.filename;
                 }
                userToBeUpdated.save();
            });
            
            req.flash('success','profile has been update successfully!');
            return res.redirect('back');  
        }catch(err)
        {
            req.flash('error',err);
           return ;
        }       
    }else{
        req.flash('error','Unautherized');
        return res.redirect('back');
    }
}