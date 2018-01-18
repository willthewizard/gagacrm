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
    1. the user is a company admin, but not a participant, in which case the privilege is "company" and code is 4 digits(EX.AE01)
    2. the user is a division admin, but but not a participant, in which case the privilege is "division" and code is meaningless, has array of division code
    3. the user is a company admin, and also a participant, in which case the privilege is "company" and code is 8 digits(EX.AE010101)
    4. the user is a division admin, and also a participant, in which case the privilege is "division" and code is 8 digits(EX.AE010101), and has array of division code
    5. the user is a participant, in which case the privilege is participant and code is 8 digits(EX.AE010101)





 */
var userSchema = new Schema(
    {   
        accountNumber: {
            type: String, required: [true, 'Account Number Required'],unique: [true, 'Account Number already exists.']
        }, 
        firstName: {
            type: String, required: [true, 'First Name required']
        },
        lastName: {
            type: String, required: [true, 'Last Name required']
        },
        photo: {
            type: String
        },
        birthday: {
            type: String, required: [true, 'Birthday required']
        },
        phone: {
            type: String, required: [true, 'Phone required']
        },
        email: {
            type: String, required: [true, 'Email required']
        },
        address: {
            type: String, required: [true, 'Address required']
        },
        sin:{
            type: String, required: [true, 'S.I.N. required']
        },
        school:{
            type: String, required: [true, 'School required']
        },
        grade:{
            type: String, required: [true, 'Grade required']
        },
        passportExpiry:{
            type: String, required: [true, 'Passport Expiry Date required']
        },
        studentExpiry:{
            type:String, required:[true,'student permit expiry date required']
        },
        trvExpiry:{
            type:String, required:[true,'trv expiry date required']
        },
        usVisa:{
            type:String, required:[true,'U.S. visa status required']
        },
        userStatus:{
            type:String, required:[true,'User status required']
        },
        referrer:{
            type:String
        },


    },
    {
        collection: 'User'
    }
);


// Doc for Mongoose Connections: http://mongoosejs.com/docs/connections
//mongoose.connect('mongodb://admin:admin@ds111188.mlab.com:11188/heroku_2nt9hwn2');
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/stafits');

// Doc for Mongoose Models: http://mongoosejs.com/docs/models
module.exports = mongoose.model('User', userSchema);
