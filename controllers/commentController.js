const Comment=require('../models/comment');
const Post =require('../models/post');
const User=require('../models/user');
module.exports.create=async function(req,res)
{   
   try{
       //2nd method to adding comment in post and comment collection
        let post=await Post.findById(req.body.postId);
        let createdComment=await Comment.create({content:req.body.content,post:req.body.postId,user:req.user._id});    
        post.comments.push(createdComment._id);
        let user=await User.findById(createdComment.user);
        post.save();
        createdComment.user=user;
        if(req.xhr){
            // console.log(req.xhr,'hello');
            return res.status(200).json({
                data:createdComment,
                messege:'comment created successfully'
            });
        }
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
        // console.log(req.params);
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
            if(req.xhr){
                return res.status(200).json({
                    data:commentToBeDeleted.id
                });
            }
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