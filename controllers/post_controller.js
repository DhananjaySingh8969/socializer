const Post=require('../models/post');
const Comment=require('../models/comment');
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
module.exports.destroy=function(req,res)
{   
   //deleting the post
    console.log(req.params.id);
    Post.findById(req.params.id,
        function(err,post){
           if(err)
           {
               console.log('error in deleting the post');
               return ;
           }
           //.id means converting the Object id into string
           if(post.user==req.user.id)
           {
               post.remove();
               Comment.deleteMany({post:req.params.id},function(err)
               {
                     if(err)
                     {
                         console.log("error in deleting comments of the post");
                         return ;
                     }
                     return res.redirect('back');
               });
           }else{
              return res.redirect('back');
           }
    });
  
}