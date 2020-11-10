import React, { useState } from 'react'
import useForm from '../../forms/useForm';
import { GenericObject } from '../../interfaces';
import { login } from '../../redux/auth/actions';

const Login: React.FC = () => {
    const [defaultValues, setDefaultValues] = useState<GenericObject>({
        email: '',
        password: ''
    })

    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(login, defaultValues)

    console.log(errors);
    console.log(values);
    
    return (
        <form onSubmit={handleSubmit} noValidate>
            <input 
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder='דוא"ך' />

            <input 
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="סיסמה" />

            <button type="submit">
                התחברות
            </button>
        </form>
    )
}

export default Login;
