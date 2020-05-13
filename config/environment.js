 const path=require('path');
 const rfs=require('rotating-file-stream');
 const fs=require('fs');

 const logDirectory=path.join(__dirname,'../production_logs');
 fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

 const accessLogStream=rfs.createStream('access.log',{
    interval:'1d',
    path:logDirectory
 })

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
    jwt_secret:process.env.SOCIALIZER_JWT_SECRET,
    morgan:{
        mode:'dev',
        options:{stream:accessLogStream}
    }
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
    jwt_secret:process.env.SOCIALIZER_JWT_SECRET,
    morgan:{
        mode:'combined',
        options:{stream:accessLogStream}
    }
}




module.exports=eval(process.env.SOCIALIZER_ENVIRONMENT)==undefined?development:eval(process.env.SOCIALIZER_ENVIRONMENT);