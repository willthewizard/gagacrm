var mongoose = require('mongoose');
const Scan = require('../models/Scan');
const User = require('../models/User');

var passwordHash = require('password-hash'); 

// email unique
module.exports = app => {
    app.post('/api/scan', (req, res) => {
        var newScanInput = req.body;
        // var newScan = new Scan(newScanInput);
        var dateString = new Date().toLocaleString();
        var newScan = new Scan({
            email:req.session.email,
            accountNumber:newScanInput.accountNumber,
            timeStamp:dateString
        });
        User.find({accountNumber:newScanInput.accountNumber},function(err,results){
            if(err){
                console.log(err)
            }else{
                if(results.length==0){
                    res.send({Success:false,message:"Failed no user with such account number found in the database"})
                }else{
                    newScan.save(function(err){
                        if(err){
                            console.log(err);
                            res.send({Success:false,message:"Error occured when saving to database"});
                        
                        }else{
                            res.send({Success:true,message:"successfully saved"})
                        }
                    });
                }
            }
            });
        
    });
    
    app.get('/api/scan', (req, res) => {
        console.log(req)
        var input = req.query;
        console.log(input);
        if(req.session.type=="vendor"){
            input.email = req.session.email;
        }
        if(req.session.type=="system"||req.session.type=="vendor"){
                Scan.find({email:input.email},function(err,results){
                    if(err){
                        console.log(err)
                    }else{
                        if(results.length==0){
                            res.send({Success:false})
                        }else{
                            console.log(results[0])
                            res.send({Success:true,records:results})
                        }            }
                });
        }
    });
    


}