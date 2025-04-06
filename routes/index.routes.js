const express = require('express')

const router = express.Router();
const upload = require('../config/multer.config')
const fileModel = require('../models/files.models')
const authMiddleware = require('../middlewares/auth')
const firebase = require('../config/firebase.config')


router.get('/home' , authMiddleware ,async(req, res)=>{

    try{
    const userFiles = await fileModel.find({
        user: req.user.userId,
    })

    // console.log(userFiles);
    
    res.render('home', {files: userFiles})  //we are sending the userFiles to the frontend
}catch(err){
    res.status(500).json({  //status 500 is used for server side errors.
        message:'server error'
    })
}
})

router.post('/upload-file' ,authMiddleware ,  upload.single('file'), async (req, res)=>{
    const newFile  = await fileModel.create({
        path: req.file.path,
        originalname: req.file.originalname,
        user: req.user.userId  //the values comes from the authMiddleware.,
    })

    res.json(newFile)
    
})  //this 'file' is the name which we have given to the input that the user is sending to the server.

router.get('/download/:path', authMiddleware ,async (req,res)=>{
    //we will check here that user trying to access the file is the owner or not.

    console.log(req.params , req.user);

    const loggedInUserId = req.user.userId;
    const path = req.params.path;

    const file = await fileModel.findOne({
        userId : loggedInUserId,
        path: path
    })

    if(file){
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }

    // by default firebase doesn't aloow us to access our data directly . we can only access it through a signed url.
const signedUrl = await firebase.storage().bucket().file(path).getSignedUrl({
    action:'read',
    expires: Date.now() + 60*1000  //in millisecond
})

res.redirect(signedUrl[0]);

})


module.exports = router;