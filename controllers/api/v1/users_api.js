const User=require('../../../models/user');
const jwt=require('jsonwebtoken');
module.exports.createSession=async function(req,res){
    try{
        let user=await User.findOne({email:req.body.email});
        if(!user || user.password!=req.body.password){
            return res.json(422,{
                message:'Invalid username/password'
            })
        }

        return res.json(200,{
            message:"Sign in successful,here is your token",
            data:{
                token: jwt.sign(user.toJSON(),'socializer',{expiresIn:1000000})
            }
        })
    }catch(err){
       console.log('**********',err);
       return res.json(500,{
           message:"Internal Server Error"
       });
    }
    
}