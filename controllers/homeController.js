const Post=require('../models/post');
const User=require('../models/user');
module.exports.home=function(req,res)
{   
    // console.log(req.cookies);//accessing cookies from browser
    // res.cookie('ui',13);//sending cookies to browser
    
    Post.find({})
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        })
        .exec(function(err,posts){
            if(err)
            {
                console.log('error in fetching posts');
            }
            // console.log(posts);
            return res.render('home',{
                title:"HOME",
                posts:posts
            })
    });
    
}
