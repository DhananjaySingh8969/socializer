const express=require('express');
const cookieParser=require('cookie-parser');
const port=8000;
const app=express();
///requiring the database from config 
const db=require('./config/mongoose');

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo')(session);
//setting cookie
app.use(cookieParser());

//for parsing post data
app.use(express.urlencoded());

//setting up static files
app.use(express.static('./assets'))

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
    secret: 'blahsomething',
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

// use express router
app.use('/', require('./routes'));


app.listen(port,function(err){
      if(err)
      {
          console.log(`Error on port number ${port}`);
          return ;
      }
      
      console.log(`Server is up and running on port number: ${port}`);
});
