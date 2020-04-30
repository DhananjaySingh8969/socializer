const Post=require('../models/post');
const User=require('../models/user');
module.exports.home=async function(req,res)
{   
    // console.log(req.cookies);//accessing cookies from browser
    // res.cookie('ui',13);//sending cookies to browser
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
        let users=await User.find({});
        return res.render('home',{title:"HOME",posts:posts,friends:users});
    }catch(err)
    {
        req.flash('error',err);
        return ;
    }
}
