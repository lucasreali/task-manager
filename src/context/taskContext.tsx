'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getUserTasks, TypeTask } from '@/lib/task';

const TaskContext = createContext<{
    tasks: TypeTask[];
    fetchTasks: () => Promise<void>;
    notifyTaskCreated: () => Promise<void>;
}>({
    tasks: [],
    fetchTasks: async () => {},
    notifyTaskCreated: async () => {},
});

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<TypeTask[]>([]);

    const fetchTasks = async () => {
        const tasks = await getUserTasks();
        setTasks(tasks);
    };

    const notifyTaskCreated = async () => {
        await fetchTasks();
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <TaskContext.Provider value={{ tasks, fetchTasks, notifyTaskCreated }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => useContext(TaskContext);
