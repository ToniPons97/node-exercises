import { json, Request, Response } from "express";

type JsonResponse = {
    msg: string
}
const jsonMessage = (msg: string): JsonResponse => ({msg});

type Planet = {
    id: number,
    name: string
}

type Planets = Planet[];

let planets: Planets = [
    { id: 1, name: 'Mercury' },
    { id: 2, name: 'Venus' }
];

const isPlanetPresent = (id: string): Planet | undefined => planets.find(p => p.id === Number(id));

const getAll = (req: Request, res: Response) => res.status(200).json(planets);
const getOneById = (req: Request, res: Response) => {
    const { id } = req.params;

    const foundPlanet = isPlanetPresent(id);
    foundPlanet ? res.status(200).json(foundPlanet) : res.status(404).json(jsonMessage('Planet not found.'));
}

const create = (req: Request, res: Response) => {
    const { id, name } = req.body;

    if (isPlanetPresent(id)) {
        res.status(303).json(jsonMessage('Planet already exists.'));
    } else {
        const newPlanet: Planet = { id: Number(id), name };
        planets = [...planets, newPlanet];
        res.status(201).json(jsonMessage('Planet created.'));
    }
}

const updateById = (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;

    if (isPlanetPresent(id)) {
        planets = planets.map(p => p.id === Number(id) ? {...p, name} : {...p});
        res.status(200).json(jsonMessage('Planet updated.'));
    } else {
        res.status(400).json(jsonMessage('Planet not present in DB.'));
    }
}

const deleteByID = (req: Request, res: Response) => {
    const { id } = req.params;

    if (isPlanetPresent(id)) {
        planets = planets.filter(p => p.id !== Number(id));
        res.status(200).json(jsonMessage('Planet deleted.'));
    } else {
        res.status(400).json(jsonMessage('Planet not present in DB.'));
    }
}

export {
    getAll,
    getOneById,
    create,
    updateById,
    deleteByID
}