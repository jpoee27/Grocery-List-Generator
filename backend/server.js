import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
const port = process.env.PORT || 5000;
import userRoutes from './routes/userRoutes.js';
import houseRoutes from './routes/houseRoutes.js';
import groceryRoutes from './routes/groceryRoutes.js';

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/house', houseRoutes);
app.use('/api/grocery', groceryRoutes);

app.get('/', (req, res) => res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on ${port}`));

//TIME STAMP ON TRAVERSY MEDIA MERN CRASH COURSE 
//1:28:15
//Rest API fully functioning now. Need to start creating the frontend now. Start by watching traversy media tutorial starting at timestamp above. Need tutorial to remember how to connect frontend to backend api amoungst a few other things. *REMEMBER TO REMOVE THESE COMMENTS AND TO REMOVE COMMENTS ABOVE CONTROLLER FUNCTIONS THAT USE PATH PARAMS. ADD PATH PARAMS COMMENTS TO FRONTEND TO REMEMBER THAT THIS WILL BE SOMETHING THAT I NEED TO FIGURE OUT ON MY OWN*
//REMEMBER TO COMMIT ANY FINAL CHANGES TO GIT ALONG THE WAY 