module.exports.home=function(req,res)
{   
    // console.log(req.cookies);//accessing cookies from browser
    res.cookie('ui',13);//sending cookies to browser
    return res.render('home',{
        title:"HOME"
    })
}
