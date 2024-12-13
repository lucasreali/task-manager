'use server';

import { auth } from '@/services/auth';
import { prisma } from './prisma';

export type TypeTask = {
    id: string;
    title: string;
    description?: string;
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
};

export const getUserTasks = async (): Promise<TypeTask[]> => {
    const session = await auth();

    if (!session) {
        return [];
    }

    const email = session.user?.email;

    if (!email) {
        return [];
    }

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    const tasks = await prisma.task.findMany({
        where: {
            user_id: user?.id,
        },
        select: {
            id: true,
            title: true,
            description: true,
            status: true,
        },
    });

    return tasks as TypeTask[];
};

export const setStatus = async (
    task_id: string,
    status: TypeTask['status']
) => {
    const updatedTask = await prisma.task.update({
        where: {
            id: task_id,
        },
        data: {
            status,
        },
    });

    return updatedTask;
};

export const createTask = async (data: {
    title: string;
    description?: string;
}) => {
    const session = await auth();

    if (!session) {
        return [];
    }

    const email = session.user?.email;

    if (!email) {
        return [];
    }

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user?.id) {
        throw new Error('User not found');
    }

    let taskData: {
        title: string;
        user_id: string;
        description?: string;
    } = {
        title: data.title,
        user_id: user.id,
    };

    if (data.description) {
        taskData.description = data.description;
    }

    const task = await prisma.task.create({
        data: taskData,
    });
};

export const deleteTask = async (task_id: string) => {
    const deletedTask = await prisma.task.delete({
        where: {
            id: task_id,
        },
    });

    return deletedTask;
};

export const updateTask = async (task_id: string, data: {title: string, description?: string}) => {
    const updatedTask = await prisma.task.update({
        where: {
            id: task_id,
        },
        data,
    });

    return updatedTask;
}
