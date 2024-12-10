import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { RegisterForm } from './_components/registerForm';

const Register = () => {
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
