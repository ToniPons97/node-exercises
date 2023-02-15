import { Request, Response } from "express";
import Joi from "joi";
import pgPromise from "pg-promise";
import dotenv from 'dotenv';

type JsonResponse = {
    msg: string
}
const jsonMessage = (msg: string): JsonResponse => ({msg});


dotenv.config();
const ENV = {
    DBNAME: process.env.DBNAME, 
    DBUSER: process.env.DBUSER, 
    DBPORT: process.env.DBPORT
};

const db = pgPromise()(`postgres://${ENV.DBUSER}:postgres@localhost:${ENV.DBPORT}/${ENV.DBNAME}`);

const setupDb = async () => {
    await db.none(`
        DROP TABLE IF EXISTS planets;
        CREATE TABLE planets (
            id SERIAL NOT NULL PRIMARY KEY,
            name TEXT NOT NULL,
            image TEXT
        );
    `);

    await db.none(`INSERT INTO planets (name) VALUES ('Mercury');`);
    await db.none(`INSERT INTO planets (name) VALUES ('Venus');`);
}

setupDb();

const planetSchema = Joi.object({
    name: Joi.string().required()
});


const getAll = async (req: Request, res: Response) => {
    const planets = await db.many(`SELECT * FROM planets`);
    res.status(200).json(planets);
};
const getOneById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const planet = await db.oneOrNone(`SELECT * FROM planets WHERE id=$1`, Number(id));
    res.status(200).json(planet);
}

const create = async (req: Request, res: Response) => {
    const { name } = req.body;

    const newPlanet = { name };
    const validatePlanet = planetSchema.validate(newPlanet);

    if (validatePlanet.error) {
        res.status(400).json(jsonMessage(validatePlanet.error.message));
    } else {
        await db.none(`INSERT INTO planets (name) VALUES ($1)`, name);
        res.status(201).json(jsonMessage('Planet created.'));
    }
}

const updateById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;

    const validatePlanet = planetSchema.validate({ name });
    if (validatePlanet.error) {
        res.status(400).json(validatePlanet.error.message);
    } else {
        await db.none(`UPDATE planets SET name = $2 WHERE id = $1`, [Number(id), name]);
        res.status(200).json(jsonMessage('Planet updated.'));
    }    
}

const deleteByID = async (req: Request, res: Response) => {
    const { id } = req.params;

    await db.none(`DELETE FROM planets WHERE id = $1`, Number(id));
    res.status(200).json(jsonMessage('Planet deleted.'));
}

const createImage = async (req: Request, res: Response) => {
    const { id } = req.params;
    const fileName = req.file?.path;

    if (fileName) {
        await db.none(`UPDATE planets SET image = $2 WHERE id = $1`, [Number(id), fileName]);
        res.status(201).json(jsonMessage('Image uploaded.'));
    } else {
        res.status(400).json(jsonMessage('Bad request. Image failed to upload.'))
    }
}


export {
    getAll,
    getOneById,
    create,
    updateById,
    deleteByID,
    createImage
}