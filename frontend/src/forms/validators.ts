import validator from 'validator';
import { GenericObject } from '../interfaces';

function isRequired(value: any, message:string) {
    if(!value)
        return message
}

function isRequiredArray(values: Array<any>, message: string) {
    if(values.length === 0)
        return message
}

function isNotEmail(value: string, message: string) {
    if(!validator.isEmail(value))
        return message;
}

function isNotValidName(value: string, message: string) {
    const pattern = RegExp('[a-zA-Z]+')
    if(!pattern.test(value)) 
        return message
}

const validators: GenericObject = {
    isRequired,
    isRequiredArray,
    isNotEmail,
    isNotValidName
}

export default validators