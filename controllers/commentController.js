const Comment=require('../models/comment');
const Post =require('../models/post');
module.exports.create=function(req,res)
{   
    // console.log(req.user);
    // adding comment to db
    // Comment.create({
    //     content:req.body.content,
    //     user:req.user._id,
    //     post:req.body.postId
    // }, 
    // function(err,cmt){
    //         if(err){console.log('error in inserting comment in db'); return}
    //         //adding comment reference to post
    //         Post.findByIdAndUpdate(req.body.postId
    //             ,{$push: { comments: [cmt._id] } }
    //             ,function(err,rslt){
    //                 if(err)
    //                 {
    //                         console.log("error in adding comment reference to post");
    //                         return ;
    //                 }
    //                 console.log("comment in post has beem added",rslt);
    //                 return ;
    //             });
    //         console.log('comment has been posted');
    //         return res.redirect('back');
    // })
    
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