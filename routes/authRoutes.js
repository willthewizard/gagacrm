var mongoose = require('mongoose');
var passwordHash = require('password-hash'); 
var Admin = require('../models/Admin');
module.exports = app => {
  app.post('/api/login', (req, res) => {
	var data = req.body;
	var username = data.email;
	var userpassword = data.password;
	console.log(req.originalUrl);
	Admin.find({'email': username.toLowerCase()}, "type password", function(err, Admin) {
		
		if (err) {
			return res.send("Error"); 
		} else {
			if (Admin[0] && passwordHash.verify(userpassword,Admin[0].password)){
				console.log("success");
				req.session.email = username.toLowerCase();
				req.session.type = Admin[0].type;
				console.log(req.session.email);
					return res.send({Success:true,
				message:"Successfully logged in"});
				// res.redirect("/");

			} else{
				return res.send({Success:false,
					message:"Wrong Password"});
			}
		}
	});
  });

  app.get('/api/current_user', (req, res) => {
	  	console.log(req.session);
		console.log(req.session.email);
		if(req.session.email==undefined){
		res.send(null);
		}else{
			res.send({data:req.session});
		}
	});
	
	app.get('/api/logout', (req, res) => {
		req.session=null;
		res.redirect("/");
  });

};
