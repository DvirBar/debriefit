import { Document, Model } from 'mongoose';


export class Pref {
    constructor(
        public name: string,
        public value: string
    ) {}
}

export class User {
    constructor(
        public email: string,
        public password: string,
        public isAdmin: boolean,
        public date_created: Date,
        public prefs?: Pref[]
    ) {}
}

export interface UserDoc extends User, Document {
 }
 
export interface UserModel extends Model<UserDoc> {
    isExist(email: string): Promise<boolean>
    findByEmail(email: string): Promise<UserDoc>
}
