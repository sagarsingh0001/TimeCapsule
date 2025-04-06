const Firebase = require('firebase-admin')
const serviceAccount = require('../timecapsule-6cc13-firebase-adminsdk-fbsvc-aa627baba7.json')  //we are saving the file into a variable.


const firebase = Firebase.initializeApp({
    credential: Firebase.credential.cert(serviceAccount),  //we send here the file that we have downloaded from the firebase . which then authenticates it.
    storageBucket:'timecapsule-6cc13.firebasestorage.app'
})


module.exports = Firebase; //this is something which i do not understand.