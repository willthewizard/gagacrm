var mongoose = require('mongoose');
const Admin = require('../models/Admin');
var passwordHash = require('password-hash'); 

// email unique
module.exports = app => {
    app.post('/api/admin', (req, res) => {
    if(req.session.type=="system"){
        var newAdminInput = req.body;
        // var newAdmin = new Admin(newAdminInput);
        newAdminInput.password = passwordHash.generate(newAdminInput.password);
        var newAdmin = new Admin(newAdminInput);
        console.log("yooo");
        newAdmin.save(function(err){
            if(err){
                console.log(err);
                if(err.code==11000){
                    res.send({Success:false,message:"Admin with this email already existed"});
                }else{
                    res.send({Success:false,message:"Missing required fields when trying to add admin"});
                }
            }else{
                res.send({Success:true,message:"successfully saved"})
            }
        });
    }
    });
    
    app.get('/api/admin', (req, res) => {
        if(req.session.type=="system"){
            
        console.log(req.query)
        var query = {}
        var input = req.query
        if(input.name!=""){
            query.name = input.name
        }
        if(input.email!=""){
            query.email=input.email
        }
        console.log(input)
        if(req.session.type=="vendor"){
            query.email = req.session.email
        }
        Admin.find(query,function(err,results){
            if(err){
                console.log(err)
            }else{
                if(results.length==0){
                    res.send({Success:false})
                }else{
                    console.log(results[0])
                    res.send({Success:true,admin:results[0]})
                }            }
        })
        // res.send("howwwdy dooo")
    }
    });
    
    app.put('/api/admin', (req, res) => {
        if(req.session.type=="system"){            
        console.log(req.body);
        req.body.password = passwordHash.generate(req.body.password);
        Admin.findOneAndUpdate({email: req.body.email}, req.body, {upsert: true}, function(err,results){
            if(err) res.send(err);
            else{
                res.send({Success:true,message:"Admin successfully updated"});
            }
        });
    }
    });

    app.delete('/api/admin', (req, res) => {
        if(req.session.type=="system"){
        Admin.remove({email: req.query.email}, function(err){
            if(err) {
                res.send(err);}
            else{
                res.send({Success:true,message:"Admin successfully removed"});
            }
        });
    }
    });

}