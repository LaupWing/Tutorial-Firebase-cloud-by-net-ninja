const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// auth trigger

exports.newUserSignup = functions.auth.user().onCreate(user=>{
    return admin.firestore().collection('users').doc(user.uid).set({
        email: user.email,
        upvotedOn:[]
    });
});
exports.userDeleted = functions.auth.user().onDelete(user=>{
    const doc =  admin.firestore().collection('users').doc(user.uid);
    return doc.delete();
});


// http callable function (adding arequest)
exports.addRequest = functions.https.onCall((data, context)=>{
    if(!context.auth){
        throw new functions.https.HttpsError(
            'unauthenticated', 
            'Only authenticated users can add request'
        );
    }
    if(data.text.length > 30){
        throw new functions.https.HttpsError(
            'invalid-argument',
            'request mst be no more than 30 characters long'
        );
    }
    return admin.firestore().collection('requests').add({
        text: data.text,
        upvotes: 0
    })
})