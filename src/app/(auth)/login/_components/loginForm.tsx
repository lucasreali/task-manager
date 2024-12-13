'use client';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import loginAction from '../loginAction';
import { useActionState } from 'react';
import { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const loginSchema = z.object({
    email: z.string().email({
        message: 'Invalid email address',
    }),
    password: z.string().min(6, {
        message: 'Password must be at least 6 characters long',
    }),
});

type LoginSchema = z.infer<typeof loginSchema>;

export const LoginForm = () => {
    const form = useForm<LoginSchema>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const [state, formAction, isPending] = useActionState(loginAction, null);
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

            <Form {...form}>
                {state?.success === true && redirect('/')}
                <form className='flex flex-col gap-3' action={formAction}>
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
                        Login
                    </Button>
                </form>
            </Form>
        </>
    );
};
