import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from "passport";
import dbConnect from './config/dbConnect.js';
import authRoutes from './routes/authRoute.js';
import "./config/passport.Config.js"




dotenv.config();
dbConnect();

const app = express();
const corsOptions = {
    origin:[ "http//localhost:3001"],
    credential: true

}

app.use(cors(corsOptions));
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: "100mb", extended: true}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookies: {
        maxAge: 60000 * 60
    }

}))
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRoutes);



const port = process.env.PORT 


app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
})




