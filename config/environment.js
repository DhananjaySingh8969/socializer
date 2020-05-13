// console.log(process.env.SOCIALIZER_GOOGLE_CLIENT_ID,process.env.SOCIALIZER_GOOGLE_CLIENT_SECRET,process.env.SOCIALIZER_GOOGLE_CALLBACK_URL);
const development={
   name:'development',
   asset_path:process.env.SOCIALIZER_ASSETS_PATH,
   session_cookie_key:process.env.SOCIALIZER_SESSION_COOKIE_KEY,
   db:process.env.SOCIALIZER_DB,
   smtp:{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:{
            user: process.env.SOCIALIZER_EMAIL,
            pass:process.env.SOCIALIZER_EMAIL_PASSWORD
        }
    },
    google_client_id:process.env.SOCIALIZER_GOOGLE_CLIENT_ID,
    google_client_secret:process.env.SOCIALIZER_GOOGLE_CLIENT_SECRET,
    google_callback_url:process.env.SOCIALIZER_GOOGLE_CALLBACK_URL,
    jwt_secret:process.env.SOCIALIZER_JWT_SECRET
}

const production={
   name:"production",
   asset_path:process.env.SOCIALIZER_ASSETS_PATH,
   session_cookie_key:process.env.SOCIALIZER_SESSION_COOKIE_KEY,
   db:process.env.SOCIALIZER_DB,
   smtp:{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:{
            user: process.env.SOCIALIZER_EMAIL,
            pass:process.env.SOCIALIZER_EMAIL_PASSWORD
        }
    },
    google_client_id:process.env.SOCIALIZER_GOOGLE_CLIENT_ID,
    google_client_secret:process.env.SOCIALIZER_GOOGLE_CLIENT_SECRET,
    google_callback_url:process.env.SOCIALIZER_GOOGLE_CALLBACK_URL,
    jwt_secret:process.env.SOCIALIZER_JWT_SECRET
}




module.exports=eval(process.env.SOCIALIZER_ENVIRONMENT)==undefined?development:eval(process.env.SOCIALIZER_ENVIRONMENT);