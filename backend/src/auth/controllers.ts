import { CreateQuery } from 'mongoose';
import Users from './User';
import { User, UserDoc } from './interfaces'; 
import bcrypt  from 'bcryptjs';
import config  from 'config';
import jwt  from 'jsonwebtoken';


// Sign JWT
const signJwt = async (user: UserDoc) => { 
    try {
        let token = jwt.sign(
            { id: user.id },
            config.get('jwtSecret'),
            { expiresIn: 3600 })

        return token
    }

    catch(error) {
        throw error
    }
}


// Compare passwords
const compareSign = async(password: string, user: UserDoc) => {
    return bcrypt.compare(password, user.password)
            .then(async (isMatch) => {
                if(!isMatch) 
                    throw {
                        msg: "Incorrect credentials"
                    }
            
                const token = await signJwt(user)
                return {
                    token,
                    user: { 
                        id: user.id,
                        email: user.email,
                        isAdmin: user.isAdmin
                    }
                }
            })
            .catch(err => {
                throw err
            });
    }

// Creating user, extends static create method
const createUser = async (newUser: CreateQuery<User>) => {

    // Create salt & hash
    return bcrypt.genSalt(10)
          .then(salt => {
            return bcrypt.hash(newUser.password, salt)
                .then(hash => {
                    newUser.password = hash;
                    return Users.create(newUser)
                    .then(async (user) => {
                        const token = await signJwt(user)
                        console.log(token);
                        
                        return {
                            token,
                            user: { 
                                id: user.id,
                                email: user.email,
                                isAdmin: user.isAdmin
                            }
                        }
                    })
                    .catch((error: Error) => {
                        throw error
                    });
                })
                .catch((error: Error) => {
                    throw error
                })
            })
        .catch((error: Error) => {
            throw error
        })
}

const updateUser = async(email: string, userId: string) => {
    return Users.findById(userId)
            .then(user => {
                if(!user) {
                    throw {
                        msg: "User not found"
                    }
                }

                user.email = email
                return user.save()
                        .then(user => {
                            return user
                        })
                        .catch(err => {
                            throw err
                        })
            })  
}

const removeUser = async(userId: string) => {
    return Users.findById(userId)
                .then(user => {
                    if(!user) {
                        throw {
                            msg: "User not found"
                        }
                    }

                    return user.remove()
                        .then(() => {
                            return {
                                msg: "User removed successfully"
                            }
                        })
                        .catch(err => {
                            throw err
                        })
                })
                .catch(err => {
                    throw err
                })
}

export default {
    createUser,
    compareSign,
    updateUser,
    removeUser
}