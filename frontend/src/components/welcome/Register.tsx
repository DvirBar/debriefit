import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import useForm from '../../forms/useForm'
import { GenericObject } from '../../interfaces'
import { register } from '../../redux/auth/actions'
import { getAuth } from '../../redux/auth/selectors'

const Register: React.FC = () => {
    const [defaultValues, setDefaultValues] = useState<GenericObject>({
        email: '',
        password: ''
    })

    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(register, defaultValues)

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
                הרשמה
            </button>
        </form>
    )
}

export default Register
