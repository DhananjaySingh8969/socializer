//requiring mongoose
const mongoose = require('mongoose');

const env=require('./environment');
//connecting to data base
mongoose.connect(`mongodb://localhost/${env.db}`);

//acquiring the connection(to check if it connected or not)
const db=mongoose.connection;

//Error
db.on('error', console.error.bind(console, 'connection error'));

//up and running
db.once('open', function() {
    // console.log("we're connected to the  DataBase!"); 
  });


module.exports=db;