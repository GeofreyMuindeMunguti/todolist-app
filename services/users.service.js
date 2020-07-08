const environment = require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt-nodejs')
const User = require('../api/users/users.model').User
const mailService = require('./mail.service')
const Secret = process.env.SECRETE

// Authenticate Users
async function authenticate(userParam) {
    const password = userParam.password;
    const user = await User.findOne({ email : userParam.email });
    
    if (user && bcrypt.compareSync(password, user.password)) {
        const {password, ...userWithoutPassword } = user.toObject();
        const token = jwt.sign({ sub: user.id }, Secret);
        return {
            ...userWithoutPassword,
            token
        };
    }
}

// Create New User
async function create(userParam){
    // Check Id user existes
    if (await User.findOne({ email: userParam.email })) {
        return;
    }
    let user = new User(userParam);
    // Save User
    await user.save();
    return User.findOne({ email: user.email});
}


// Get All Users
async function getAll() {
    return await User.find({});
}


// Get One User
async function getOne(_id) {
    return User.findById(_id);
}


// Update a User
async function update(id, userParam) {
    let user = await User.findById(id);
    // Validate
    if (!user) throw 'User not Found';
    // Copy userParam
    Object.assign(user, userParam);
    await user.save();
    return User.findById(id);
}



// Delete a user
async function _delete(id) {
    await User.deleteOne({_id: id});
}

// Delete all users
async function deleteAll() {
    return await User.remove({});
}


// send reset code to user via email
async function passwordResetToken(userParam){
    let user = await User.findOne({ email: userParam.email});

    if (!user) throw 'User not Found';
    let resetcode = Math.floor(100000 + Math.random() * 900000);
    user.resetcode = resetcode.toString();
    await user.save();

    await mailService.passwordResetEmail(user);
    return user;
}


// Reset users password
async function passwordReset(userParam) {
    let user = await User.findOne({email: userParam.email});
    // Validate
    if (!user) throw 'User not Found';
    if (user.resetcode == userParam.resetcode){
    
    Object.assign(user, userParam);
    user.resetcode = null;
    await user.save();

    return User.findById(user.id);
    }
    else{
        return {"message":"Code mismatch"}
    }
}

 

// export all of those functions in order to access them outside of this file
module.exports = { authenticate, create, getAll, getOne, update, delete: _delete, deleteAll,  passwordResetToken,  passwordReset};
