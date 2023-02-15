import { Request, Response, NextFunction } from "express";
import passport from "passport";
import jsonMessage from "./jsonMessage.js";

const authorize = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (!user || err) {
            res.status(401).json(jsonMessage('Unauthorized.'));
        } else {
            req.user = user;
            next();
        }
    })(req, res, next);
}

export default authorize;