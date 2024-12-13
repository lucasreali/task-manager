'use client';
import { Button } from '@/components/ui/button';
import logoutAction from '../(auth)/(logout)/logoutAction';

export const LogOutButton = () => {

    return (
            <Button className='fixed top-2 right-2' onClick={logoutAction}>
                Logout
            </Button>
    );
};
