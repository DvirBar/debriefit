import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import useForm from '../../forms/useForm';
import { GenericObject } from '../../interfaces';
import { login } from '../../redux/auth/actions';
import { getAuth } from '../../redux/auth/selectors';

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

    const auth = useSelector(getAuth)

    return (
        <form onSubmit={handleSubmit} noValidate>
            <input 
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder='דוא"ל' />

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
