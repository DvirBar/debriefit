import { config } from './config'
import { GenericObject } from '../interfaces';
import validators from './validators';

const configFields = config.fields;

export default function validateForm(fields: GenericObject) {
    let errors: GenericObject = {}
    for(let key in fields) {
        const error = validateField(key, fields[key]);
        
        if (error !== '')
            errors[key] = error
    }

    return errors
};

const validateField = (key: string, value: any) => {
    const configField = configFields[key];
    // For every validation in a field
    for(let configItem in configField) {
        const message = configField[configItem].message;
        const validate = validators[configItem];
        const error = validate(value, message);

        if(error)
            return error;
    }

    return '';
}