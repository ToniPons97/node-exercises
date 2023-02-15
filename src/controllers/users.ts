import { Request, Response } from 'express'
import db from '../db.js'
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import jsonMessage from '../jsonMessage.js';

dotenv.config();

const signUp = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await db.oneOrNone(`SELECT * FROM users WHERE username = $1`, username);

    if (!user) {
        const { id } = await db.one(`INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id`, [username, password]);
        res.status(201).json({id, msg: `User ${username} created successfully.`});
    } else {
        res.status(409).json(jsonMessage(`User ${username} already in use.`));
    }
}

const logIn = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await db.one(`SELECT * FROM users WHERE username = $1`, username);
    if (user && user.password === password) {
        const payload = { id: user.id, username };

        const { SECRET = '' } = process.env;
        const token = jwt.sign(payload, SECRET);

        await db.none(`UPDATE users SET token = $2 WHERE id = $1`, [user.id, token]);
        res.status(200).json({ id: user.id, username, token });
    } else {
        res.status(404).json(jsonMessage('Incorrect username or password.'));
    }    
}

export {
    logIn,
    signUp
}