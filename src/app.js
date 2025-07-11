import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { swaggerSpec, swaggerUi } from "./config/swagger.js";

import emailRoutes from './routes/email.routes.js';

const app = express();

import { NODE_ENV } from './config/env.config.js';

app.use(express.json());
app.use(cors());
app.use(helmet());

if (NODE_ENV === 'development') app.use(morgan('dev'));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/email', emailRoutes);

app.get('/', (req, res) => {
    console.log(' Email service API is running...!');
    res.status(200).send({
        message: 'Email service API is running...',
    })
});


export default app;
