import { FormConfig } from './interfaces';

export const config: FormConfig = {
    fields: {
        // Authenticatiion
        email: {
            isRequired: { message: 'דרוש דואר אלקטרוני' },
            isNotEmail: { message: 'כתובת דוא"ל לא תקינה' } 
        },
        
        password: {
            isRequired: { message: 'דרושה סיסמה' },
            // isNotStrongPass: { message: 'הסיסמה חלשה מדי' }
        }
    }
}