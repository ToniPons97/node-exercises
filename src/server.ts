import express from 'express';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import 'express-async-errors';
import multer from 'multer';

import { getAll, getOneById, create, updateById, deleteByID, createImage } from './controllers/planets.js';
import { logIn, signUp } from './controllers/users.js';

dotenv.config();
const port = process.env.PORT;


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads'),
    filename: (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({ storage });

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Server is up!' });
});

// planets endpoints
app.get('/api/planets', getAll);
app.get('/api/planets/:id', getOneById);
app.post('/api/planets', create);
app.put('/api/planets/:id', updateById);
app.delete('/api/planets/:id', deleteByID);
app.post('/api/planets/:id/image', upload.single('image'), createImage);

// users endpoints
app.post('/api/users/login', logIn);
app.post('/api/users/signup', signUp);


app.listen(port);