import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { auth } from '@/services/auth';
import { redirect } from 'next/navigation';
import { TaskArea } from './_components/taskArea';
import { TaskForm } from './_components/taskForm';
import { TaskProvider } from '@/context/taskContext';

const Home = async () => {
    const session = await auth();

    if (!session) {
        redirect('/login');
    }

    return (
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
    );
};

export default Home;
