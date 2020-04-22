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
    });
});


// UPvtoe callable function

exports.upvote = functions.https.onCall(async (data, context)=>{
    // Check auth state
    if(!context.auth){
        throw new functions.https.HttpsError(
            'unauthenticated', 
            'Only authenticated users can add request'
        );
    }
    // Get Refs for users doc & requests doc
    const user = admin.firestore().collection('users').doc(context.auth.uid);
    const request = admin.firestore().collection('requests').doc(data.id);
    const doc = await user.get()
    // Check user hasnt already upvoted rerquest
    if(doc.data().upvotedOn.includes(data.id)){
        throw new functions.https.HttpsError(
            'failed-precondition', 
            'You can only upvote something once'
        );
    }
    // update user array
    await user.update({
        upvotedOn:[...doc.data().upvotedOn, data.id]
    })
    // update votes on request
    return request.update({
        upvotes: admin.firestore.FieldValue.increment(1)
    });
})