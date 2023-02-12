import express from 'express';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import 'express-async-errors';
import { getAll, getOneById, create, updateById, deleteByID } from './controllers/planets.js';

dotenv.config();
const port = process.env.PORT;



const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Server is up!' });
});

app.get('/api/planets', getAll);
app.get('/api/planets/:id', getOneById);
app.post('/api/planets', create);
app.put('/api/planets/:id', updateById);
app.delete('/api/planets/:id', deleteByID);

app.listen(port);