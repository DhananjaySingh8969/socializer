const Comment=require('../models/comment');
const Post =require('../models/post');
module.exports.create=function(req,res)
{   
   
    //2nd method to adding comment in post and comment collection
    Post.findById(req.body.postId,function(err,post){
            if(err)
            {   
                //needed to handle the error
                console.log(err)
                return ;
            }
            Comment.create({
                content:req.body.content,
                post:req.body.postId,
                user:req.user._id
            },function(err,cmt){
                    if(err)
                    {   
                        //needed to handle the error
                        console.log(err);
                        return ;
                    }
                    post.comments.push(cmt._id);
                    post.save();
                    // console.log(cmt);
            });
            return res.redirect('back');
    });
    // console.log(req.body);
    // return res.redirect('back');
}
module.exports.destroy=function(req,res)
{
    Comment.findById(req.params.id,function(err,comment){
                 if(err)
                 {
                     console.log("error in deleting comment-1")
                     return ;
                 }
                //  if(comment.post.id==req.user.id)
                //  {
                    let commentTOBeDeleted=comment;
                     comment.remove();
                    Post.findById(commentTOBeDeleted.post,function(err,post){
                            if(err)
                            {
                                console.log("error in deleting comment-2")
                                return ;
                            }
                            if(commentTOBeDeleted.user==req.user.id || (post.user==req.user.id))
                            {
                                const index = post.comments.indexOf(commentTOBeDeleted.id);
                                if (index > -1) {
                                   post.comments.splice(index, 1);
                                }
                                post.save();
                                return res.redirect('back');
                            }else{
                                console.log("unautherized to delete the comment");
                                return res.redirect('back');
                            }
                            
                    });
               
    });
}