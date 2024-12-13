import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { TaskProvider } from '@/context/taskContext';
import { auth } from '@/services/auth';
import { redirect } from 'next/navigation';
import { LogOutButton } from './_components/logoutButton';
import { TaskArea } from './_components/taskArea';
import { TaskForm } from './_components/taskForm';

const Home = async () => {
    const session = await auth();

    if (!session) {
        redirect('/login');
    }


    return (
        <> 
            <LogOutButton />
            <TaskProvider>
                <div className='w-full h-screen flex items-center justify-center'>
                    <Card className='w-[500px]'>
                        <CardHeader className='flex'>
                            <CardTitle className='flex items-center justify-between'>
                                Tasks
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button>Add</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>New Task</DialogTitle>
                                            <TaskForm />
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <TaskArea />
                        </CardContent>
                    </Card>
                </div>
            </TaskProvider>
        </>
    );
};

export default Home;
