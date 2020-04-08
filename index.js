const express=require('express');
const port=8000;
const app=express();

//setting up static files
app.use(express.static('./assets'));


//adding layouts
const expressLayouts=require('express-ejs-layouts');
app.use(expressLayouts);


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
