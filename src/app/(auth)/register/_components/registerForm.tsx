'use client';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { redirect } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { registerAction } from '../registerAction';

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
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        if (state?.success === false) {
            setDialogOpen(true);
        }
    }, [state]);

    return (
        <>
            <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Erro</AlertDialogTitle>
                        <AlertDialogDescription>
                            {state?.message}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {state?.success && redirect('/login')}

            <Form {...form}>
                <form action={formAction} className='flex flex-col gap-3'>
                    <FormField
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    placeholder='John Doe'
                                    {...field}
                                    required
                                />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    placeholder='mail@example.com'
                                    {...field}
                                    required
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
                                    required
                                />
                            </FormItem>
                        )}
                    />
                    <Button disabled={isPending} type='submit'>
                        Register
                    </Button>
                </form>
            </Form>
        </>
    );
};
