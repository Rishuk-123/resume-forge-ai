const express=require('express');
const cors=require("cors");
const dotenv=require("dotenv");
const connectDB=require('./config/db');
const authRouter=require('./routes/auth')
const resumeRouter=require('./routes/resume')

dotenv.config()
connectDB();

const app=express();
//middlewares
app.use(express.json())
app.use(cors());

app.use('/api/auth',authRouter)
app.use('/api/resume', resumeRouter);

const PORT=process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`the server is running on the port ${PORT}`);
})






