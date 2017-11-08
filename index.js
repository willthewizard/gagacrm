const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
var cookieParser = require('cookie-parser');
const passport = require('passport');
const bodyParser = require('body-parser');
// const keys = require('./config/keys');
// require('./models/User');
// require('./models/Survey');
// require('./services/passport');

// mongoose.Promise = global.Promise;
// mongoose.connect(keys.mongoURI);

const app = express();
mongoose.connect('mongodb://admin:gaga2017@ds123361.mlab.com:23361/gagacrm');
const Admin = require('./models/Admin');

app.use(cookieParser());

app.use(bodyParser.json());
app.use(
  cookieSession({
    secret:'gagacrm',
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: 'sessionId'
  })
); 

// ************************* Set Up New Amin*********************
  var passwordHash = require('password-hash'); 
  var adminUser = new Admin({
    email:"willzard.zhang@gmail.com",
    password:"gaga2017",
    type:"admin"
    }); 
  password = "gaga2017";
  adminUser.password = passwordHash.generate(password);
  Admin.findOneAndUpdate({email:adminUser.email}, {$set:{password:adminUser.password,type:adminUser.type}},{upsert:true},function(error, Admin) {
    
    if (error) {
      console.log(error); 
      if (error.name === 'MongoError' && error.code === 11000) {
        if (error.message.includes("email")) {
          return res.send("Email already exists.");
        }
      }
      else if (error.name === 'ValidationError') {
        return res.send(error.errors[Object.keys(error.errors)[0]].message);
      }
    }
    else { 
      // if(Admin==null){ 
      //  adminUser.save(function (err, results) {
      //                  console.log(results);

      //    if (err) {
      //        console.log(results);
      //        return res.send(err);
      //    }

      //  });
      // }
    }
    
  });
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
// *********************************************

/*
app.use(passport.initialize());
app.use(passport.session());

require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);
*/
require('./routes/authRoutes')(app);

if (process.env.NODE_ENV === 'production') { 
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
