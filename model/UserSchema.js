let mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ 
    email: 'string', 
    password: 'string',
    topics: ['string'],
    uuid: 'string'
});


const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;