const Post=require('../models/post');
const User=require('../models/user');
module.exports.home=async function(req,res)
{   
    // console.log(req.cookies);//accessing cookies from browser
    // res.cookie('ui',13);//sending cookies to browser
    try{
        let posts=await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
            path:'comments',
            populate:{
                path:'user'
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
