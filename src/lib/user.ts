import { compareSync } from 'bcrypt-ts';
import { prisma } from './prisma';



export const findUserByCredentials = async (
    email: string,
    password: string
) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        console.log(user);

        if (!user || !user.password) {
            return null;
        }

        const passwordMatch = compareSync(password, user.password);

        if (!passwordMatch) {
            return null;
        }

        return user;
    } catch (error) {
        return null;
    }
};
