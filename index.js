const express=require('express');
const cookieParser=require('cookie-parser');
const port=8000;
const app=express();
///requiring the database from config 
const db=require('./config/mongoose');

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

//Accessing route module
const router=app.use('/',require('./routes'));

//setting up view engine
app.set('view engine','ejs');
app.set('Views','./views')





app.listen(port,function(err){
      if(err)
      {
          console.log(`Error on port number ${port}`);
          return ;
      }
      console.log(`Server is up and running on port number: ${port}`);
});
