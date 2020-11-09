import { Request, Response, NextFunction } from 'express';
import config from 'config';
import jwt from 'jsonwebtoken';
import Users from '../auth/User';

const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.get('x-auth-token');

    // Check for token
    if(!token) 
        return res.status(401).send({ msg: 'Missing authorization token' })

    try {
        // Verify token
        const decoded: any = jwt.verify(token, config.get('jwtSecret'));

        // Add user from payload
        Users.findById(decoded.id) 
            .then(user => {
                res.locals.user = user
                next()
            })
            .catch(() => { 
                return res.status(500).send({ msg: 'Internal server error' }) 
            })
    } catch(e) {
       return res.status(400).send({ msg: 'Token is invalid or has been expired' })
    }
}

export default auth;