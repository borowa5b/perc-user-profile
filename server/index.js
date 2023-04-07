import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import * as dotenv from 'dotenv'
import { UserProfileController } from './application/user-profile.controller.js';
import { PostgresqlConfig } from './infrastructure/postgresql.config.js';
import { PassportConfig } from './infrastructure/passport.config.js';

// Initialize express app
const app = express();

// Initialize dotnenv
dotenv.config();

// Parse json and urlencoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Multer
app.use('/image', express.static('image'))

// Enable CORS
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Express session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

// Cookie parser
app.use(cookieParser(process.env.SESSION_SECRET));

// Synchronize with database
const postgresqlConfig = new PostgresqlConfig();

// Configure passport authentication
const passportConfig = new PassportConfig(app, postgresqlConfig.userModel);
passportConfig.configure();

// Runs routes handling
new UserProfileController(app, postgresqlConfig.userModel, passportConfig.passport).handleRoutes();

// Start express server
app.listen(3001, () => {
    console.log('Express server listening on port 3001');
});

export default app;