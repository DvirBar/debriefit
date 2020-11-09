import { Request, Response, NextFunction } from 'express';

const authAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!res.locals.user.isAdmin)
            return res.status(401).json({ msg: 'You are unauthorized!' })
        
        next();
    }
    catch(e) {
        return res.status(500).json({ msg: 'Internal server error' })
    }       
}

export default authAdmin;