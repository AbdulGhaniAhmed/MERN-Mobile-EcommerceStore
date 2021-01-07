const express = require('express');
const env = require('dotenv') 
const app = express();
<<<<<<< HEAD
<<<<<<< Updated upstream
const bodyParser = require('body-parser');
=======
const path = require('path')
const cors = require('cors')

// const bodyParser = require('body-parser');
>>>>>>> Stashed changes
=======
const cors = require('cors')

// const bodyParser = require('body-parser');
>>>>>>> c530004806a729eb86b02ee72445654fab752745
const mongoose = require('mongoose');

//dotev is libaray use for .env variable
env.config();

//express.json() use as middleware to send/post data
   //app.use(express.json());
//but we have better option than express.json() i.e bodyParser

//routes
const authRoutes = require('./routes/auth');
const adminAuthRoutes = require('./routes/admin/auth');
<<<<<<< HEAD
<<<<<<< Updated upstream
=======
const categoryRoutes = require('./routes/category');
const productRoutes  = require('./routes/product');
const cartRoutes = require('./routes/cart')
>>>>>>> Stashed changes
=======
const categoryRoutes = require('./routes/category');
const productRoutes  = require('./routes/product');
>>>>>>> c530004806a729eb86b02ee72445654fab752745

//To connect our server with mongodb 
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@merncluster.siw62.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
{
    useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true
}).then(()=>{
    console.log('mongo db connected')
})
<<<<<<< HEAD
<<<<<<< Updated upstream
app.use(bodyParser());
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
=======

app.use(cors());
app.use(express.json());
app.use('/public',express.static(path.join(__dirname,'uploads')));
app.use('/api',authRoutes);
app.use('/api',adminAuthRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',cartRoutes);
>>>>>>> Stashed changes
=======

app.use(cors());
app.use(express.json());
app.use('/api',authRoutes);
app.use('/api',adminAuthRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
>>>>>>> c530004806a729eb86b02ee72445654fab752745

//install nodemon for automatic restarting of server otherwise we have to always restart the server after some changes in file

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
});