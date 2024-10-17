import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './routes/authRoute.js';
import loanRouter from './routes/loanRoute.js'
import cookieParser from  'cookie-parser';
import cors from 'cors'

dotenv.config();

const mongoURI = process.env.MONGO_URI || "your-default-mongo-uri";
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(cors());

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


app.use('/api/auth',authRoute);
app.use('/api/loan',loanRouter);


app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})
