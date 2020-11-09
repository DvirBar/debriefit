import { Schema, model } from 'mongoose';
import { UserDoc, UserModel } from './interfaces';

// Create schema
const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
        // Email validation
    },
    password: {
        type: String, 
        required: [true, 'Password is required']
        // Password validation
    },
    prefs: [{
        name: {
            type: String
            // Validate name
        },
        value: {
            type: String
            // Validate value (with associated name)
        }
    }],
    isAdmin: {
        type: Boolean,
        default: false
    },
    date_created: {
        type: Date,
        default: Date.now
    }
})


UserSchema.statics.isExist = async function(email: string): Promise<boolean> {
    return this.findOne({ email: email})
         .then((user: UserDoc) => {    
            if(user)
                return true
            
            return false
         })
         .catch((error: Error) => {
             throw error;
         })
}

UserSchema.statics.findByEmail = async function(email: string): Promise<UserDoc> {
    return this.findOne({ email: email })
               .then((user: UserDoc) => {
                    if(user)
                        return user 

                    throw {
                        msg: "Incorrect credentials"
                    }
               })
               .catch((err: Error) => {
                    throw err;
               })
}

const Users: UserModel = model<UserDoc, UserModel>('User', UserSchema);


export default Users