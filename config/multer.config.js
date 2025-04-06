
const multer = require('multer')
const firebaseStorage = require('multer-firebase-storage');
const firebase = require('./firebase.config')
const serviceAccount = require('../timecapsule-6cc13-firebase-adminsdk-fbsvc-aa627baba7.json')



const storage = firebaseStorage({
    credentials: firebase.credential.cert(serviceAccount),
    bucketName: 'timecapsule-6cc13.firebasestorage.app',
    unique:true,  //this will allow the files with the same name to be uploaded on the cloud without disturbing the already present file.
})

  
const upload = multer({
    storage: storage,

})

module.exports = upload;
