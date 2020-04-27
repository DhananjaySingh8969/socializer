const Post=require('../models/post');
const Comment=require('../models/comment');
module.exports.create=async function(req,res)
{    
    
    try{
        let post=await Post.create({content:req.body.content,user:req.user._id});
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
        let postToBeDeleted=await Post.findById(req.params.id);
        //.id means converting the Object id into string
        if(postToBeDeleted.user==req.user.id)
        {
            postToBeDeleted.remove();
        }
        await Comment.deleteMany({post:req.params.id});
        req.flash('success','post has been deleted successfully!');
        return res.redirect('back');
    }
    catch(err)
    {
        req.flash('error',err);
       return ;
    }
}