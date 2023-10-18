import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import 'express-async-errors';
import { handleError } from './utils/errors';
import { rateLimit } from 'express-rate-limit';
import { config } from './config/config';
import { medicineRouter } from './routers/medicine.router';
import { prescriptionRouter } from './routers/prescription.router';
import { authRouter } from './routers/auth.router';
import { verifyToken } from './middlewares/verifyToken';
import './utils/db';

require('dotenv').config();

const app = express();

app.use(
  cors({
    origin: config.corsOrigin,
  }),
);
app.use(express.json());
//app.use(
//  rateLimit({
//    windowMs: 5 * 60 * 1000, // 5 minutes
//    max: 100, // Limit each IP to 100 requests per `window` (here, per 5 minutes)
//  }),
//);

app.use('/', authRouter);

app.use(verifyToken);

app.use('/medicine', medicineRouter);
app.use('/prescription', prescriptionRouter);

app.use(handleError);

app.listen(config.serverPort, '0.0.0.0', () => {
  console.log(`listening on localhost:${config.serverPort}`);
});
