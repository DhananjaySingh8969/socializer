const express=require('express');
const cookieParser=require('cookie-parser');
const port=8000;
const app=express();
require('./config/view-helpers')(app);

const path=require('path');
const env=require('./config/environment');
const logger=require('morgan');

///requiring the database from config 
const db=require('./config/mongoose');

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT=require('./config/passport-jwt-strategy');
const passportGoogle=require('./config/passport-google-oauth2-strategy');




const MongoStore=require('connect-mongo')(session);
const sassMiddleware=require('node-sass-middleware');
const flash=require('connect-flash');
const customMware=require('./config/middleware');

//CHANGE:: checked if mode is devlopment then only used scss->css
if(env.name=='devlopment')
{   
    app.use(sassMiddleware({
        src:path.join(__dirname,env.asset_path,'/scss'),
        dest:path.join(__dirname,env.asset_path,'/css'),
        debug:false,
        outputStyle:'extended',
        prefix:'/css'
    }));
}


//setting cookie
app.use(cookieParser());

//for parsing post data
app.use(express.urlencoded({extended:false}));

//setting up static files
app.use(express.static('./assets'));
app.use(express.static('./public/assets'));
//make the upload path available to the user
app.use('/uploads',express.static(__dirname+'/uploads'));

app.use(logger(env.morgan.mode,env.morgan.options));

//adding layouts
const expressLayouts=require('express-ejs-layouts');
app.use(expressLayouts);

//extract style and scripts tag form the sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



//setting up view engine
app.set('view engine','ejs');
app.set('Views','./views')
//mongo store used to save session cookie in the db
app.use(session({
    name: 'socializer',
    // TODO change the secret before deployment in production mode
    secret:env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store:new MongoStore({
        mongooseConnection:db,
        autoRemove:'disabled'
    }),
    function(err) {
          console.log(err || "conntect mongo-db setup ok!")
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
// use express router
app.use('/', require('./routes'));

//setting up socket.io
const chatServer=require('http').Server(app);
const chatSockets=require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
// console.log('chat server listening at port :5000');

app.listen(port,function(err){
      if(err)
      {
          console.log(`Error on port number ${port}`);
          return ;
      }
      
    //   console.log(`Server is up and running on port number: ${port}`);
});
