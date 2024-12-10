'use client';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { registerAction } from '../registerAction';
import { useActionState } from 'react';
import { redirect } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const LoginSchema = z.object({
    name: z.string().min(3, {
        message: 'Name must be at least 3 characters long',
    }),
    email: z.string().email({
        message: 'Invalid email address',
    }),
    password: z.string().min(6, {
        message: 'Password must be at least 6 characters long',
    }),
});

export const RegisterForm = () => {
    const form = useForm<z.infer<typeof LoginSchema>>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    const [state, formAction, isPending] = useActionState(registerAction, null);

    return (
        <>
            {state?.success === false && (
                <Alert className='border-red-700 bg-red-100'>
                    <AlertTitle className='text-red-600'>Erro</AlertTitle>
                    <AlertDescription className='text-red-600'>
                        {state.message}
                    </AlertDescription>
                </Alert>
            )}

            {state?.success && redirect('/login')}


            <Form {...form}>
                <form className='flex flex-col gap-3' action={formAction}>
                    <FormField
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <Input placeholder='John Doe' {...field} />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    placeholder='mail@exemple.com'
                                    {...field}
                                />
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

                    <Button disabled={isPending} type='submit'>
                        {' '}
                        Register{' '}
                    </Button>
                </form>
            </Form>
        </>
    );
};
