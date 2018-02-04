var mongoose = require('mongoose');
const User = require('../models/User');

module.exports = app => {
    app.post('/api/user', (req, res) => {
        var newUserInput = req.body;
        var newUser = new User(newUserInput);
        newUser.save(function(err){
            if(err){
                if(err.code==11000){
                    res.send({Success:false,message:"User with this account number already existed"});
                }else{
                    res.send({Success:false,message:"Missing required fields when trying to add user"});
                }
            }else{
                res.send({Success:true,message:"successfully saved"})
            }
        });
        
    });
    
    app.get('/api/user', (req, res) => {
        var query = {}
        var input = req.query
        if(input.firstName!=""){
            query.firstName = input.firstName
        }
        if(input.accountNumber!=""){
            query.accountNumber=input.accountNumber
        }
        if(input.email!=""){
            query.email=input.email
        }
        console.log(input)
        User.find(query,function(err,results){
            if(err){
                console.log(err)
            }else{
                if(results.length==0){
                    res.send({Success:false})
                }else{
                    console.log(results[0])
                    res.send({Success:true,user:results[0]})
                }            }
        })
        // res.send("howwwdy dooo")
    });
    
    app.put('/api/user', (req, res) => {
        User.findOneAndUpdate({accountNumber: req.body.accountNumber}, req.body, {upsert: true}, function(err,results){
            if(err) res.send(err);
            else{
                res.send({Success:true,message:"User successfully updated"});
            }
        });
    });

    app.delete('/api/user', (req, res) => {
        User.remove({accountNumber: req.query.accountNumber}, function(err){
            if(err) {console.log(err);
                res.send(err);}
            else{
                console.log("suscess");
                res.send({Success:true,message:"User successfully removed"});
            }
        });
    });

    app.get('/api/listAllUsers', (req, res) => {
        if(req.session.type=="system"){
                User.find({},function(err,results){
                    if(err){
                        console.log(err)
                    }else{
                        results = results.sort(function(a, b){
                            if(a.lastName < b.lastName) return -1;
                            if(a.lastName > b.lastName) return 1;
                            return 0;
                        })
                        res.send({Success:true,userList:results});
                    }
                })
        }
    });
    
}