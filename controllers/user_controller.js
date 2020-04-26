const User=require('../models/user');
module.exports.profile=async function(req,res){
      
    try{
        let user=await User.findById(req.params.id);
        return res.render('../views/user_profile.ejs',{all_user:user});
    }catch(err)
    {   
        console.log('ERROR',err);
        return ;
    }
    
}
module.exports.post=function(req,res){
    return res.render('../views/user_post.ejs',{});
}
module.exports.signIn=function(req,res){
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
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
        return res.redirect('/users/profile');
    }
    return res.render('../views/user_sign_up',{
        title:"socializer/sign-Up"
    })
}

//user create
module.exports.create =async function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    try{
        let user=await User.findOne({email: req.body.email});
        if (!user)
        {
            let createdUser=await User.create(req.body);
            // console.log('account has been created');
            return res.redirect('/users/sign-in');
        }
        // console.log('user already exist');
        return res.redirect('back');
    }catch(err)
    {
       console.log('ERROR',err);
       return ;
    }
    
}

//user sign in create a session
module.exports.createSession=function(req,res){
       return res.redirect('/');
}
module.exports.destroySession=function(req,res)
{
    req.logout();
    return res.redirect('/');
}
module.exports.update=async function(req,res)
{   
    // console.log(req.body);
    if(req.user && req.user.id==req.params.id)
    { 
        try{
            let user=await User.find({email:req.body.email});
            if(user && user.length && user[0].email!=req.user.email)
            {
                return res.status(401).send('email already exist');
            }  
            let updatedUser=await User.findByIdAndUpdate(req.params.id,req.body);
            console.log('profile has been update');
            return res.redirect('back');  
        }catch(err)
        {
           console.log('ERROR',err);
           return ;
        }       
    }else{
       return res.status(401).send('Unautherized');
    }
}