const Post=require('../models/post');
const Comment=require('../models/comment');
const User=require('../models/user');
module.exports.create=async function(req,res)
{    
   
    try{
        let post=await Post.create({content:req.body.content,user:req.user._id});
        let user=await User.findById(post.user);
        if(req.xhr)
        {    
            post.user=user;
            return res.status(200).json({
                data:post,
                message:'post created successfully!'
           });
        }
        req.flash('success','post has been created successfully!');
        return res.redirect('back');
    }catch(err)
    {   
        req.flash('error',err);
        return ;
    }
}
module.exports.destroy=async function(req,res)
{    
    try{
        // console.log(req.xhr,req.params);
        let postToBeDeleted=await Post.findById(req.params.id);
        //.id means converting the Object id into string
        if(postToBeDeleted.user==req.user.id)
        {
            postToBeDeleted.remove();
        }
        await Comment.deleteMany({post:req.params.id});
        // req.flash('success','post has been deleted successfully!');
        if(req.xhr)
        {   
            return res.status(200).json({
                data:postToBeDeleted._id,
                message:'post deleted successfully!'
           });
        }
        return res.redirect('back');
    }
    catch(err)
    {
        req.flash('error',err);
       return ;
    }
}