'use client'

import { useState, useEffect } from 'react'
import { useSidebar } from '@/context/SidebarContext'
import { useRouter, useParams } from 'next/navigation'
import { TrashIcon } from '@phosphor-icons/react'

import { Task } from '@/types'
import { tasksMock } from '@/lib/data'
import TaskItem from '@/components/dashboard/TaskItem'
import AddTask from '@/components/dashboard/AddTask'
import { v4 as uuidv4 } from 'uuid' 



export default function ListPage(){
    const { isOpen } = useSidebar()
    const { listId } = useParams();

    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        const filteredTasks = tasksMock.filter(task => task.listId === listId);
        setTasks(filteredTasks);
    }, [listId]);

    function handleAddTask(title: string){
        const newTask: Task = {
            id: uuidv4(),
            listId: listId!,
            title,
            completed: false,
            priority: "none"
        };
        setTasks(prev => [...prev, newTask]);
    }

    function toggleTaskCompleted(taskId: string) {
        setTasks(prev => prev.map(t => t.id === taskId ? {...t, completed: !t.completed }: t))
    }

    return(
        <main className={`
            flex flex-col justify-between h-full items-center
            trasition-all duration-300
            p-4`}
        >
            <div className='flex flex-col w-full'>
                <h1 className='text-center font-bold text-2xl text-white mb-8'>{listId}</h1>
                <AddTask onAdd={handleAddTask} />
                <ul>
                    {tasks.map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onToggleCompleted={() => toggleTaskCompleted(task.id)}
                        />
                    ))}
                </ul>
            </div>
            <button className='cursor-pointer border-2 rounded-full text-white hover:text-gray-400 hover:border-gray-400 transition-all'>
                <TrashIcon size={34} weight='fill' className= 'm-2'/>
            </button>
        </main>
    );
}