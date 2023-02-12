import express from 'express';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import 'express-async-errors';

dotenv.config();
const port = process.env.PORT;

type JsonResponse = {
    msg: string
}
const jsonMessage = (msg: string): JsonResponse => ({msg});

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json(jsonMessage('Server is up!'));
});

app.listen(port);