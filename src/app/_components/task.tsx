'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { deleteTask, setStatus } from '@/lib/task';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { MdEditSquare } from 'react-icons/md';
import { TaskForm } from './taskForm';
import { useTaskContext } from '@/context/taskContext';

interface TaskProps {
    id: string;
    title: string;
    description?: string;
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}

export const Task = ({ id, title, description, status }: TaskProps) => {
    const { notifyTaskCreated } = useTaskContext();
    const [taskStatus, setTaskStatus] = useState(status);

    const handleStatusChange = (newStatus: string) => {
        setTaskStatus(newStatus as TaskProps['status']);
        setStatus(id, newStatus as TaskProps['status']);
    };

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleEditClick = () => {
        setIsDialogOpen(true);
    };

    const handleOnDelete = async () => {
        await deleteTask(id);
        await notifyTaskCreated();

    };

    return (
        <div>
            <div>
                <div className={`py-2 ${description ? 'pb-4' : ''}`}>
                    <div className='flex items-center justify-between w-full'>
                        <h3
                            className={`text-xl line-clamp-1 ${
                                taskStatus === 'COMPLETED'
                                    ? 'line-through text-gray-400 italic'
                                    : ''
                            }`}
                        >
                            {title}
                        </h3>
                        <div className='flex gap-1'>
                            <Select
                                value={taskStatus}
                                onValueChange={handleStatusChange}
                            >
                                <SelectTrigger className='w-[120px]'>
                                    <SelectValue placeholder='Status' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Status</SelectLabel>
                                        <SelectItem
                                            value='PENDING'
                                            className='cursor-pointer'
                                        >
                                            Pending
                                        </SelectItem>
                                        <SelectItem
                                            value='IN_PROGRESS'
                                            className='cursor-pointer'
                                        >
                                            In Progress
                                        </SelectItem>
                                        <SelectItem
                                            value='COMPLETED'
                                            className='cursor-pointer'
                                        >
                                            Completed
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant='outline'
                                        className='outline-none focus:ring-0'
                                    >
                                        ...
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem
                                        className='cursor-pointer flex items-center gap-2'
                                        onClick={handleEditClick}
                                    >
                                        <MdEditSquare />
                                        <span>Edit</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className='cursor-pointer flex items-center gap-2'
                                        onClick={handleOnDelete}
                                    >
                                        <FaTrash />
                                        <span>Delete</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <Dialog
                                open={isDialogOpen}
                                onOpenChange={setIsDialogOpen}
                            >
                                <DialogContent>
                                    <DialogTitle>Edit Taks</DialogTitle>
                                    <TaskForm
                                        task_id={id}
                                        title={title}
                                        description={description}
                                    />
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                    {description ? (
                        <p
                            className={`text-sm text-justify line-clamp-3 ${
                                taskStatus === 'COMPLETED'
                                    ? 'line-through text-gray-400 italic'
                                    : ''
                            }`}
                        >
                            {description}
                        </p>
                    ) : (
                        ''
                    )}
                </div>
            </div>

            <Separator />
        </div>
    );
};
