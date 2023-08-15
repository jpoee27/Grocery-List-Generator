import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
const port = process.env.PORT || 5000;
import userRoutes from './routes/userRoutes.js';
import houseRoutes from './routes/houseRoutes.js';

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/house', houseRoutes);

app.get('/', (req, res) => res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on ${port}`));

//TIME STAMP ON TRAVERSY MEDIA MERN CRASH COURSE 
//1:28:15
//Backend functionality for user routes are all working now. Next need to set up list routes, controller, and model. Not sure if I will need anything else for the list routes at this point, but start getting these set up before moving onto anything in the frontend. Probably should start with listModel or listRoutes first.
//REMEMBER TO COMMIT ANY CHANGES TO GIT ALONG THE WAY 