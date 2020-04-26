const Post=require('../models/post');
const Comment=require('../models/comment');
module.exports.create=async function(req,res)
{    
    
    try{
        let post=await Post.create({content:req.body.content,user:req.user._id});
        return res.redirect('back');
    }catch(err)
    {   
        console.log('ERROR',err);
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
        return res.redirect('back');
    }
    catch(err)
    {
       console.log('ERROR',err);
       return ;
    }
}