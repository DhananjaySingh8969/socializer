const Post=require('../models/post');
const User=require('../models/user');
function checkIfContains(trgt,matchingList)
{
    for(let item of matchingList)
    {
          if(item.id==trgt)return true;
    }
    return false;
}
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
        let loggedUserFriends;
        if(req.user)
        {
            loggedUserFriends=await User.findById(req.user.id)
                .populate({
                    path:'friends',
                    options: { sort: { createdAt: -1 } },
                    populate:{
                        path:'user',
                        select: '-password'
                    }
                })                    
            loggedUserFriends=loggedUserFriends.friends;
        }
        let users=[];
        if(loggedUserFriends)
        {
            let results=await User.find({})
            for(let res of results)
            {   
                let flag=true;
                if(checkIfContains(res.id,loggedUserFriends))continue;
                users.push(res);
            }
        }else{
            users=await User.find({});
        }
        return res.render('home',{title:"HOME",posts:posts,friends:loggedUserFriends,users:users});
    }catch(err)
    {
        req.flash('error',err);
        return ;
    }
}
