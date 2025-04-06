const express = require('express');
const userRouter = require('./routes/user.routes')
const indexRouter = require('./routes/index.routes')
const app = express();
const dotenv = require('dotenv')
const connectToDB = require('./config/db')
const cookieParser = require('cookie-parser')


dotenv.config();
connectToDB();
app.set('view engine' , 'ejs')

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',indexRouter)
app.use('/user' , userRouter)


process.on('uncaughtException', (err)=>{
    console.log('Uncaught exception');
    console.log(err);
    
})

app.listen(3000 , (req, res)=>{
    console.log("the server is running on port 3000");
})