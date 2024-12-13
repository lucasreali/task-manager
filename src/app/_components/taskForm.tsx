'use client';

import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTaskContext } from '@/context/taskContext';
import { createTask, updateTask } from '@/lib/task';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface EditTaskFormProps {
    task_id?: string;
    title?: string;
    description?: string;
}

const FormSchema = z.object({
    title: z.string().min(3, {
        message: 'Title must be at least 3 characters long',
    }),
    description: z.string().optional(),
});

export const TaskForm = ({
    title = '',
    description = '',
    task_id,
}: EditTaskFormProps) => {
    const { notifyTaskCreated } = useTaskContext();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: { title, description },
    });

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        try {
            if (task_id) {
                updateTask(task_id, data);
            } else {
                await createTask(data);
                form.reset();
            }
            
            await notifyTaskCreated();
        } catch (error) {
            console.error('Failed to create task:', error);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex flex-col gap-3'
            >
                <FormField
                    name='title'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <Input
                                placeholder='Title'
                                {...field}
                                disabled={form.formState.isSubmitting}
                            />
                        </FormItem>
                    )}
                />
                <FormField
                    name='description'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                placeholder='Description'
                                {...field}
                                disabled={form.formState.isSubmitting}
                            />
                        </FormItem>
                    )}
                />
                <Button type='submit' disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Submitting...' : 'Confirm'}
                </Button>
            </form>
        </Form>
    );
};
