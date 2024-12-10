'use client';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import loginAction from '../loginAction';

const LoginSchema = z.object({
    email: z.string().email({
        message: 'Invalid email address',
    }),
    password: z.string().min(6, {
        message: 'Password must be at least 6 characters long',
    }),
});
export const LoginForm = () => {
    const form = useForm<z.infer<typeof LoginSchema>>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    return (
        <Form {...form}>
            <form className='flex flex-col gap-3' action={loginAction}>
                <FormField
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <Input placeholder='mail@exemple.com' {...field} />
                        </FormItem>
                    )}
                />
                <FormField
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <Input
                                placeholder='********'
                                type='password'
                                {...field}
                            />
                        </FormItem>
                    )}
                />

                <Button> Login </Button>
            </form>
        </Form>
    );
};
