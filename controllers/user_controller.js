module.exports.profile=function(req,res){
    return res.render('../views/user_profile.ejs',{});
}
module.exports.post=function(req,res){
    return res.render('../views/user_post.ejs',{});
}