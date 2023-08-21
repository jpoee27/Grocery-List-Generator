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
//All of my houseRoutes are now working properly. Even got the update and delete routes working to send the _id as a path parameter through the request instead of through the request body. Next need to create the groceryModel, groceryRoutes, and groceryController. The functionality here should basically be the exact same as all of the house files beside changing everything from house to grocery. 
//REMEMBER TO COMMIT ANY FINAL CHANGES TO GIT ALONG THE WAY 