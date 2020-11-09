import express, { Request, Response, NextFunction } from 'express';
import auth  from '../middleware/auth';
import authAdmin  from '../middleware/authAdmin';
import UserController from './controllers';
import bcrypt  from 'bcryptjs';

// User model
import { User } from './interfaces';
import Users from './User'

// // Errors
// const authMessages = require('../../messages/auth');
// const { InvalidCredentials, UserDoesNotExist, NotAuthorizedSelf, SuccessDelete } = authMessages;

const router = express.Router()

// @route   GET api/auth/users
// @desc    Get all users
// @access  Admin
router.get('/users', [auth, authAdmin], 
(req: Request, res: Response, next: NextFunction) => {
    Users.find()
        .then(users => res.send(users))
        .catch(next)
})

// @route   GET api/auth/user
// @desc    Get user by id from token
// @access  Private
router.get('/user', auth, 
(req: Request, res: Response, next: NextFunction) => {
    Users.findById(res.locals.user.id)
        .select('-password')
        .then(user => res.send(user))
        .catch(next);
})

// @route   POST api/auth/register
// @desc    Register
// @access  Public
router.post('/register', 
async (req: Request, res: Response, next: NextFunction) => {
    const { 
        email,
        password
    } = req.body;
    
    if(await Users.isExist(email)) {
        return res.status(400).send("User already exists")
    }

    const newUser = new User(
        email,
        password,
        false,
        new Date()
    );

    const user: object = await UserController.createUser(newUser)

    res.status(200).send(user)
})

// @route   POST api/auth/login
// @desc    Login
// @access  Public
router.post('/login', 
async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).send("Both email and password are required")
    }

    // Check for existing user
    Users.findByEmail(email)
         .then(user => {
            UserController.compareSign(password, user)
                          .then(data => {
                              return res.status(200).send(data)
                          })
                          .catch(err => {
                              return res.status(400).send(err)
                          })
         })
         .catch(err => {
             return res.status(403).send(err)
         })

    // Validate password
    
})

// @route   PUT api/auth/user/:id
// @desc    Update user details
// @access  Private
router.put('/user', auth, 
(req: Request, res: Response, next: NextFunction) => {
    const {
        email
    } = req.body

    const userId = res.locals.user.id

    UserController.updateUser(email, userId)
                  .then(user => {
                    return res.status(200).send(user)
                  })
                  .catch(err => {
                    return res.status(400).send(err)
                  })
})

// @route   DELETE api/auth/user/:id
// @desc    Remove user
// @access  Admin
router.delete('/user/:id', [auth, authAdmin], 
(req: Request, res: Response, next: NextFunction) => {
    // If a user tries to delete himself
    if(res.locals.user.id === req.params.id)
        return res.status(400).send("Users are not allowed to delete themselves")

    const userId = req.params.id
    UserController.removeUser(userId)
                  .then(msg => {
                      return res.status(200).send(msg)
                  })
                  .catch(err => {
                      return res.status(400).send(err)
                  })
})

export default router;