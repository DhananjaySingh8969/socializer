const Post=require('../models/post');
const Comment=require('../models/comment');
const User=require('../models/user');
const Like=require('../models/like');
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
async function deleteLikesOfComments(commentsToDeleted)
{
    if(commentsToDeleted)
    {
        for(let comment of commentsToDeleted)
        {
            await Like.deleteMany({likeable:comment._id,onModel:'Comment'});
        }
    }
}
async function deleteLikesOfPost(likes)
{
    if(likes)
    {
        for(let like of likes)
        {
            await Like.findByIdAndDelete(like);
        }
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
            //deleting likes of post
            //  deleteLikesOfPost(postToBeDeleted.likes);
             await Like.deleteMany({likeable:postToBeDeleted._id,onModel:'Post'});
            
            // deleting likes of comments associated with post
            let commentsToDeleted=await Comment.find({post:req.params.id});
            //  await Like.deleteMany({_id:{$in:commentsToDeleted}});
            deleteLikesOfComments(commentsToDeleted);
            
            await Comment.deleteMany({post:req.params.id});
            postToBeDeleted.remove();
                // req.flash('success','post has been deleted successfully!');
            if(req.xhr)
            {   
                return res.status(200).json({
                    data:postToBeDeleted._id,
                    message:'post deleted successfully!'
                });
            }
        }else{
            req.flash('error','unautherized to delete the Post!');
            return res.redirect('back');
        }
        
        
        return res.redirect('back');
    }
    catch(err)
    {
        req.flash('error',err);
        console.log('error in deleting post',err);
       return ;
    }
}