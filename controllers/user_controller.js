const User=require('../models/user');
const path=require('path');
const fs=require('fs');
const password_reset_mailer=require('../mailer/password_reset_mailer');
const PasswordResetToken=require('../models/password_reset_token');
// const defaultAvatar="\\uploads\\users\\avatars/dafault.png"
const crypto=require('crypto');
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
            createdUser.avatar=User.avatarPath+'/default.png';
            createdUser.save();
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
                 var pathOfAvatar;
                 if(req.file && userToBeUpdated.avatar)pathOfAvatar=path.join(__dirname,'..',userToBeUpdated.avatar);
                 if(pathOfAvatar && fs.existsSync(pathOfAvatar) && path.basename(pathOfAvatar)!='default.png'){
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
module.exports.passwordResetPage=function(req,res){
        return res.render('../views/password_reset/user_password_reset.ejs');
}

module.exports.sendingResetLink=async function(req,res){
    
    // console.log(req.params);
    try{ 
        let user=await User.findOne(req.params);
        if(!user)
        {   
            req.flash('error','Incorrect Email Id!');
            return res.redirect('back');
        }
        let token=crypto.randomBytes(20).toString('hex');
        let userToken=await PasswordResetToken.findOne({email:user.email});
        if(!userToken)
        {
            userToken=await PasswordResetToken.create({
                email:user.email,
                token:token,
                isValid:true
            });
        }
        userToken.isValid=true;
        userToken.token=token;
         userToken.save();
        let resetLink="http://localhost:8000/users/password-reset-form/"+token;
        user.link=resetLink;
        password_reset_mailer.resetLink(user);
        req.flash('success','A reset link has been sent to your email!');
        return res.redirect('/users/sign-in');
    }catch(err)
    {
        req.flash('error','something went wrong:(');
        console.log('error in sendingResetLink',err);
        return res.redirect('back');
    }
    
    
}
module.exports.passwordResetForm=async function(req,res)
{      
    try{
        let token=await PasswordResetToken.findOne({token:req.params.token});
        if(!token || !token.isValid)
        {
            return res.render('../views/password_reset/reset_form',{
                email:null
            });
        }
        // token.isValid=false;
        // token.save();
        return res.render('../views/password_reset/reset_form',{
            email:token.email
        });
    }catch(err){
          req.flash('error','something went wrong:(');
         return res.redirect('back');
    }
        
}
module.exports.passwordUpdate=async function(req,res){
    //    console.log(req.body);
    try{
        if(req.body.password!=req.body.confirm_password)
        {
            req.flash('error','confirm password didnt match:( ,please try again');
            return res.redirect('back');
        }
        let user=await User.findOne({email:req.body.email});
        user.password=req.body.password;
        user.save();
        let token=await PasswordResetToken.findOne({email:req.body.email});
        token.isValid=false;
        token.save();
        req.flash('success','password reset successful!');
        return res.redirect('/users/sign-in');
        // return res.render('../views/user_sign_in.ejs',{
        //     title:"socializer/sign-in"
        // });
    }catch(err)
    {    
        req.flash('error','something went wrong:(,please try again');
        console.log('error in password update',err);
        return res.redirect('back');
    }
        
    
}

const Friendship=require('../models/friendship');
module.exports.friendToggle=async function(req,res)
{
    //users/friend-toggle/?id="fsafdsa"
    try{
        let to_friendship=await Friendship.findOne({to_user:req.user.id,from_user:req.query.id});
        let to_friend=await User.findById(req.user.id);
        let from_friend=await User.findById(req.query.id);
        let addFriend=false;
        if(to_friendship)
        {
            let from_friendship=await Friendship.findOne({to_user:req.query.id,from_user:req.user.id});
            to_friend.friends.pull(req.query.id);
            from_friend.friends.pull(req.user.id);
            to_friendship.remove();
            from_friendship.remove();
            // to_friendship.save();
            // from_friendship.save();
        }else{
            await Friendship.create({to_user:req.user.id,from_user:req.query.id});
            await Friendship.create({to_user:req.query.id,from_user:req.user.id});
            to_friend.friends.push(req.query.id);
            from_friend.friends.push(req.user.id);
            addFriend=true;
        }
        to_friend.save();
        from_friend.save();
        // return res.redirect('back');
        return res.json(200,{
            messege:"friend successfully toggled",
            data:{ addFriend:addFriend,
                   to_friend:to_friend,
                   from_friend:from_friend
                }
        });
    }catch(err){
        console.log('ERROR in Toggling friend***',err);
        return res.json(500,{
            messege:"INTERNAL SERVER ERROR!"
        });
    }
    
}