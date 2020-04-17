const functions = require('firebase-functions');

// auth trigger

exports.newUserSignup = functions.auth.user().onCreate(user=>{
    console.log('User created')
    console.log(user)
    return user
})
exports.userDeleted = functions.auth.user().onDelete(user=>{
    console.log('User deleted')
    console.log(user)
    return user
})