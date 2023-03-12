const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config();

// set up server

const app = express();

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log(`server started on port : ${PORT}`))

app.use(express.json())

// connect to mongodb
mongoose.connect(process.env.MDB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
}, (err) => {
    if (err) return console.error(err)
    console.log('Connected to mongodb')
}) 

//set up routes 
app.use('/auth', require('./routers/userRouter'))

//allow you to run specific function for single path 
// when path starts with /auth, i am going to be using the 'userRouter'