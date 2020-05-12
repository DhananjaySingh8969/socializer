const development={
   name:'development',
   asset_path:'/assets',
   session_cookie_key:'blahsomething',
   db:'socializer_devlopment',
   smtp:{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:{
            user: 'singhdhananjay8969@gmail.com',
            pass: '#8969#7352#Thanos'
        }
    },
    google_client_id:"351776873665-41ecj4a799kfesrpnvvuib2ukrqll05m.apps.googleusercontent.com",
    google_client_secret:"CX957cquKheFrfS2_15r2_sm",
    google_callback_url:"http://localhost:8000/users/auth/google/callback",
    jwt_secret:'socializer'
}

const production={
    name:"production"
}



module.exports=development;