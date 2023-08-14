import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
const port = process.env.PORT || 5000;
import userRoutes from './routes/userRoutes.js';

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/users', userRoutes);

app.get('/', (req, res) => res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on ${port}`));

//TIME STAMP ON TRAVERSY MEDIA MERN CRASH COURSE 
//1:13:22
//Created login and logout functionality in userController. Also created a method in our userSchema to match passwords when the user logs in since the password in the database is hashed. This method can be called whenever the User model in brought in to a file. Next going to created the Auth Protect Middleware for our protected routes. After creating the middleware, then I should be able finish the functionality of our userController. Afterwards I should create the rest of my routes, controllers, and create a list schema for all the grocery/house items that will be stored in the database. Should be pretty simple considering that by this point I will have the protected routes middleware set up and should be able to take list schema and do what is needed to get these routes functioning. 