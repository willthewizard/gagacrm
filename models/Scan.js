var mongoose = require('mongoose');

// Doc for Mongoose Schemas: http://mongoosejs.com/docs/guide 
var Schema = mongoose.Schema;

/**
 * Note that the database was loaded with data from a JSON file into a
 * collection called gillers.
 */

 /*
    Note to self:
    The code,isParticipant and privilege is used to indicate the identity of a user, there are 5 possibilities 
    1. the user is a company scan, but not a participant, in which case the privilege is "company" and code is 4 digits(EX.AE01)
    2. the user is a division scan, but but not a participant, in which case the privilege is "division" and code is meaningless, has array of division code
    3. the user is a company scan, and also a participant, in which case the privilege is "company" and code is 8 digits(EX.AE010101)
    4. the user is a division scan, and also a participant, in which case the privilege is "division" and code is 8 digits(EX.AE010101), and has array of division code
    5. the user is a participant, in which case the privilege is participant and code is 8 digits(EX.AE010101)





 */
var scanSchema = new Schema(
    {   
        email: {
            type: String, required: [true, 'Email required']
        }, 
        accountNumber:{
            type:String
        },
        timeStamp:{
            type:String
        } 
    },
    {
        collection: 'Scan'
    }
);


// Doc for Mongoose Connections: http://mongoosejs.com/docs/connections
//mongoose.connect('mongodb://scan:scan@ds111188.mlab.com:11188/heroku_2nt9hwn2');
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/stafits');

// Doc for Mongoose Models: http://mongoosejs.com/docs/models
module.exports = mongoose.model('Scan', scanSchema);
