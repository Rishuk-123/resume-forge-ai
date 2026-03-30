const express=require('express');
const cors=require("cors");
const dotenv=require("dotenv");
const connectDB=require('./config/db');
const authRouter=require('./routes/auth')

dotenv.config()
connectDB();

const app=express();
//middlewares
app.use(express.json())
app.use(cors());

app.use('/api/auth',authRouter)
const PORT=process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`the server is running on the port ${PORT}`);
})






