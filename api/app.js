import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';
import morgan from 'morgan';

import routes from './routes/index.js';
// import authmiddleware from './middlewares/auth.middleware.js';

const app = express();

app.use(cors());

 // Parse json
app.use(express.json());

app.use(express.urlencoded({
  extended: true,
}));

// create "middleware"
app.use(morgan('combined'));

// Security middleware
// Helmet
app.use(helmet());
// hpp
app.use(hpp());

// app.use(authmiddleware);

app.use(routes);



export default app;
