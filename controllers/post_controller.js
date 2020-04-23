const Post=require('../models/post');

module.exports.create=function(req,res)
{   
    console.log(req.user);
    Post.create({
        content:req.body.content,
        user:req.user._id
        }, 
        function(err,post){
            if(err){console.log('error in inserting post in db'); return}
            
            console.log('post has been posted');
            
            return res.redirect('back');
        })
}