const express=require('express');
const port=8000;
const app=express();


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
