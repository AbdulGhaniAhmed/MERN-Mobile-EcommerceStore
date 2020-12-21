const express = require('express');
const env = require('dotenv') 
const app = express();
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//dotev is libaray use for .env variable
env.config();

//express.json() use as middleware to send/post data
   //app.use(express.json());
//but we have better option then express.json() i.e bodyParser

//routes
const authRoutes = require('./routes/auth');
const adminAuthRoutes = require('./routes/admin/auth');

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@merncluster.siw62.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
{
    useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true
}).then(()=>{
    console.log('mongo db connected')
})
app.use(express.json());
app.use('/api',authRoutes);
app.use('/api',adminAuthRoutes);

// app.get('/',(req,res,next)=>{
//     res.status(200)
//     .json({
//         message:"Hello from get api"
//     });
// });

// app.post('/product',(req,res)=>{
//     res.status(200)
//     .json({
//         message: req.body
//     });
// });

//install nodemon for automatic restarting of server otherwise we have to always restart the server after some changes in file

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
});