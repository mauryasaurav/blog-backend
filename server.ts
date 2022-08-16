import express from "express";
import { PORT, SESSION, CORS_ORIGINS } from "./details.json";
import "./Helpers/db";
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import route from "./Routes/index";
import passport from "./Helpers/passport";

const app = express();

app.use(cookieParser(SESSION.SECRET));
app.use(session({
    secret: SESSION.SECRET, // session secret
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: SESSION.AGE, httpOnly: true }, // In MilliSeconds,
    name: "UserC"
}));

app.use(cors({
    origin: CORS_ORIGINS,
    credentials: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use('/api', route);

app.listen(PORT, () => {
    console.log("Server started on port -", PORT)
})