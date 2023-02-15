import pgPromise from "pg-promise";
import * as dotenv from 'dotenv';

dotenv.config();
const { DBUSER, DBPORT, DBNAME } = process.env;

const db = pgPromise()(`postgres://${DBUSER}:postgres@localhost:${DBPORT}/${DBNAME}`);

const setupDb = async () => {
    await db.none(`
        DROP TABLE IF EXISTS planets;
        CREATE TABLE planets (
            id SERIAL NOT NULL PRIMARY KEY,
            name TEXT NOT NULL,
            image TEXT
        );

        DROP TABLE IF EXISTS users;
        CREATE TABLE users(
            id SERIAL NOT NULL PRIMARY KEY,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            token TEXT
        );
    `);

    await db.none(`INSERT INTO planets (name) VALUES ('Mercury');`);
    await db.none(`INSERT INTO planets (name) VALUES ('Venus');`);
    await db.none(`INSERT INTO users (username, password) VALUES ('alice', 'letmein123');`);
}

setupDb();

export default db;