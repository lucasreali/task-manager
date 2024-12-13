'use client';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Task } from './task';
import { useTaskContext } from '@/context/taskContext';


export const TaskArea = () => {
    const { tasks } = useTaskContext();

    return (
        <ScrollArea className='max-h-96 rounded-lg border bg-card text-card-foreground shadow-sm p-3'>
            <Separator />
            {tasks.map((task) => (
                <Task key={task.id} {...task} />
            ))}
        </ScrollArea>
    );
};
