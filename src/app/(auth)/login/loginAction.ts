'use server';

import { signIn } from '@/services/auth';

const loginAction = async (_prevState: any, formData: FormData) => {
    const entries = Array.from(formData.entries());
    const data = Object.fromEntries(entries) as {
        email: string;
        password: string;
    };

    if (!data.email || !data.password) {
        return { success: false, message: 'Please fill all fields' };
    }

    try {
        await signIn('credentials', formData);
        return { success: true };
    } catch (error: any) {
        if (error.message.includes('NEXT_REDIRECT')) {
            return { success: true };
        }
        return { success: false, message: 'Wrong Credentials' };
    }
};

export default loginAction;
