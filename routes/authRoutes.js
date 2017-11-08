var mongoose = require('mongoose');
var passwordHash = require('password-hash'); 

module.exports = app => {
  app.post('/api/login', (req, res) => {
	var data = req.body;
	var username = data.username;
	var userpassword = data.password;
	Admin.find({'email': username.toLowerCase()}, "type password", function(err, Admin) {

		if (err) {
			return res.send("Error"); 
		} else {
			if (Admin[0] && passwordHash.verify(userpassword,Admin[0].password)){
				req.session.email = username.toLowerCase();
				req.session.type = Admin[0].type;
			 	 return res.send("Success");

			} else{
				return res.send("Wrong Password");
			}
		}
	});
  });

  app.get('/api/current_user', (req, res) => {

    res.send("hiiii");
  });

};
