const Comment=require('../models/comment');
const Post =require('../models/post');
module.exports.create=async function(req,res)
{   
   try{
       //2nd method to adding comment in post and comment collection
        let post=await Post.findById(req.body.postId);
        let createdComment=await Comment.create({content:req.body.content,post:req.body.postId,user:req.user._id});    
        post.comments.push(createdComment._id);
        post.save();
        req.flash('success','comment has been posted  successfully!');
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
        let comment=await Comment.findById(req.params.id);
        let commentToBeDeleted=comment;
        comment.remove();
        let post=await Post.findById(commentToBeDeleted.post);
        if(commentToBeDeleted.user==req.user.id || (post.user==req.user.id))
        {
            const index = post.comments.indexOf(commentToBeDeleted.id);
            if(index>-1)
                post.comments.splice(index, 1);
            post.save();
            req.flash('success','comment has been deleted successfully!');
            return res.redirect('back');         
        }else{
            req.flash('error','unautherized to delete the comment!');
            return res.redirect('back');
        }
    }catch(err)
    {
        req.flash('error',err);
        return ;
    }
    
}