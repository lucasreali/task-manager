import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { auth } from '@/services/auth';
import { redirect } from 'next/navigation';
import { RegisterForm } from './_components/registerForm';

const Register = async () => {
    const session = await auth();

    if (session) {
        redirect('/');
    }

    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <Card className='w-96'>
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                </CardHeader>
                <CardContent>
                    <RegisterForm />
                </CardContent>
                <CardFooter>
                    <CardDescription>
                        Already have an account?
                        <a
                            href='/login'
                            className='font-bold underline underline-offset-2 ml-1'
                        >
                            Login
                        </a>
                    </CardDescription>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Register;
