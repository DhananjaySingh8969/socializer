module.exports.profile=function(req,res){
    return res.render('../views/user_profile.ejs',{});
}
module.exports.post=function(req,res){
    return res.render('../views/user_post.ejs',{});
}
module.exports.signIn=function(req,res){
    return res.render('user_signIn',{
        title:"socializer/signIn"
    });
}
module.exports.signUp=function(req,res)
{
    return res.render('user_signUp',{
        title:"socializer/signUp"
    })
}