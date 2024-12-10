'use server';
import { prisma } from '@/lib/prisma';
import { hashSync } from 'bcrypt-ts';


export const registerAction = async (_prevState: any, formData: FormData) => {
    const entries = Array.from(formData.entries());
    const data = Object.fromEntries(entries) as {
        name: string;
        email: string;
        password: string;
    };

    console.log('Registering user:', data);

    if (!data.name || !data.email || !data.password) {
        return { message: 'All fields are required', success: false };
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: data.email },
        });

        if (user) {
            return { message: 'User already exists', success: false };
        }

        await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashSync(data.password),
            },
        });

        return { success: true };
    } catch (error: any) {
        console.log('Error creating user:', error.message);
        return { message: 'Internal Server Error', success: false };
    }
};
