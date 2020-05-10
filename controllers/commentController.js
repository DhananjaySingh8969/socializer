const Comment=require('../models/comment');
const Post =require('../models/post');
const User=require('../models/user');
const commentMailer=require('../mailer/comments_mailer');
const commentEmailWorker=require('../workers/comment_email_worker');
const queue=require('../config/kue');
const Like=require('../models/like');
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
        // commentMailer.newComment(createdComment);
        //sending comment to comment worker for delay job
        let job=queue.create('emails',createdComment).save(function(err){
            if(err){
                console.log('error in enqueuing comment mailer',err);
                return ;
            }
            console.log('job id',job.id);
        });
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
        let post=await Post.findById(commentToBeDeleted.post);
        if(commentToBeDeleted.user==req.user.id || (post.user==req.user.id))
        {   
            post.comments.pull((commentToBeDeleted.id));
            post.save();
            //deleting likes associated with comments
            await Like.deleteMany({likeable:commentToBeDeleted._id,onModel:'Comment'});
            // let likes=commentToBeDeleted.likes;
            // if(likes)
            // {
            //     for(let like of likes)
            //     {
            //         await Like.findByIdAndDelete(like);
            //     }
            // }
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
        console.log('error in deleting comment',err);
        return ;
    }
    
}