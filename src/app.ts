import express from 'express';
import cors from 'cors';
import { prodRouter as productRouter } from './routes/products';
import { categRouter as categoryRouter } from './routes/categories';
import { logMiddleware } from './middleware/log';
import { logErrors, clientErrorHandler, errorHandler } from './middleware/error';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(logMiddleware);

app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

export { app };
