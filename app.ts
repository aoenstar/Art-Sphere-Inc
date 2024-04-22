import express from 'express';
import routers from './src/routes/routers';
import initializePassport from './src/config/configPassport';
import passport from 'passport';
import session from 'express-session';

const app = express();
app.use(express.json());

initializePassport(passport);

app.use(session({
    secret: 'Our little secret.',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
    }
  }))

app.use(passport.initialize());
app.use(passport.session());

routers.forEach((entry) => app.use(entry.prefix, entry.router));

export default app;
