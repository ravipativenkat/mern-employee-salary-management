import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import db from './config/Database.js';
import SequelizeStore from 'connect-session-sequelize';
import FileUpload from 'express-fileupload';
import UserRoute from './routes/UserRoute.js';
import DataJabatanRoute from './routes/DataJabatanRoute.js';
import AuthRoute from './routes/AuthRoute.js';
import DataKehadiranRoute from './routes/DataKehadiranRoute.js';

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db: db
});

app.use(session({
    secret: process.env.SESS_SECRET || 'secret',
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));

app.use(UserRoute);
app.use(DataJabatanRoute);
app.use(AuthRoute);
app.use(DataKehadiranRoute);

if (process.env.NODE_ENV !== 'test') {
    app.listen(process.env.APP_PORT || 5000, () => {
        console.log('Server up and running...');
    });
}

export default app;