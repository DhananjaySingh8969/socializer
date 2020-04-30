const Post=require('../../../models/post');
const User=require('../../../models/user');
const Comment=require('../../../models/comment');
module.exports.index=async function(req,res){
    
    try{
        let posts=await Post.find({})
            .sort('-createdAt')
            .populate(
                {
                    path:'user',
                    select: '-password'
                }
            )
            .populate({
            path:'comments',
            options: { sort: { createdAt: -1 } },
            populate:{
                path:'user',
                select: '-password'
            }
        });
        return res.json(200,{
            message:'list of posts',
            posts:posts
        })
    }catch(err){
        console.log('ERROR',err);
        return res.json(500,{messege:"Internal Server Error"});
    }
    
}
module.exports.destroy=async function(req,res)
{    
    try{
        // console.log(req.xhr,req.params);
        let postToBeDeleted=await Post.findById(req.params.id);
        //.id means converting the Object id into string
        // if(postToBeDeleted.user==req.user.id)
        // {
            postToBeDeleted.remove();
        // }
        await Comment.deleteMany({post:req.params.id});
        // req.flash('success','post has been deleted successfully!');
        // if(req.xhr)
        // {   
            return res.status(200).json({
                data:postToBeDeleted._id,
                message:'post deleted successfully!'
           });
        // }
        // return res.redirect('back');
    }
    catch(err)
    {
        req.flash('error',err);
       return ;
    }
}