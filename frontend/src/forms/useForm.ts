import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GenericObject } from '../interfaces';
import validateForm from './formValidator';

const useForm = (
    callback: (...params: any) => any, 
    defaultValues: {}, 
    ...params: any) => {
    const dispatch = useDispatch();
    const [ values, setValues ] = useState<GenericObject>({});
    const [ errors, setErrors ] = useState({});
    const [ isSubmitting, setIsSubmitting ] = useState(false)

    useEffect(() => {
        if(defaultValues)
            setValues(defaultValues)
    }, [defaultValues])

    useEffect(() => {
        // If there are no errors and the form was submitted
        if(Object.keys(errors).length === 0 && isSubmitting)
            dispatch(callback(...params, values))

        // If there are errors cancel submit
        if(errors)
            setIsSubmitting(false)

    }, [errors])

    const handleSubmit = (event: any) => {
        if(event)
            event.preventDefault();
        
        setIsSubmitting(true);
        setErrors(validateForm(values)); 
    }

    const handleChange = (event: any) => {

        // If not custom field
        if(event.target) {
            setValues(values => ({...values, 
                [event.target.name]: event.target.value}));
        }

        // If custom field
        else {
            setValues(values => ({...values, [event.name]: event.value}));
        }
    }

    const initValues = (initValues: [] | undefined) => {
        if(!isSubmitting) 
            if(!initValues) {
                setValues(defaultValues);
                setErrors({})
            }
        } 

    return {
        handleChange,
        handleSubmit,
        values,
        errors,
        initValues
    }
 }

 export default useForm;