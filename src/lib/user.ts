import { compareSync } from 'bcrypt-ts';
import { prisma } from './prisma';

type User = {
    name: string;
    email: string;
};

export const findUserByCredentials = async (
    email: string,
    password: string
): Promise<User | null> => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user || !user.password) {
            return null;
        }

        const passwordMatch = compareSync(password, user.password);

        if (!passwordMatch) {
            return null;
        }

        return { email: user.email, name: user.name };
    } catch (error) {
        return null;
    }
};
