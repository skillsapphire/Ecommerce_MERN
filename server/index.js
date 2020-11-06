import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import colors from 'colors';

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'

import dotenv from 'dotenv'
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import morgan from 'morgan';

dotenv.config()

const PORT = process.env.PORT || 4000;

const app = express();
app.use(morgan('common'))
app.use(cors())
app.use(bodyParser.json())


app.use('/api/v1/products', productRoutes)
app.use('/api/v1/users', userRoutes)

// not found route
app.use(notFound)

// custom handle error 
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`server is listing on ${PORT}-----`.yellow.bold)
    mongoose.connect(process.env.DATABASE_URI, { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true })
        .then(() => console.log("DATABASE connected-----".cyan.bold))
        .catch(error => console.log("DATABASE CONNECTION FAILED ".red.underline.bold, error))
}
);