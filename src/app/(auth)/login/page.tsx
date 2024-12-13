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
import { LoginForm } from './_components/loginForm';

const Login = async () => {

    const session = await auth();

    if (session) {
        redirect('/');
    }
    
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <Card className='w-96'>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
                <CardFooter>
                    <CardDescription>
                        Don't have an account?
                        <a href='/register' className='font-bold underline underline-offset-2 ml-1'>
                            Register
                        </a>
                    </CardDescription>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Login;
