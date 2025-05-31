'use client'

import { useState, useEffect } from 'react'
import { useSidebar } from '@/context/SidebarContext'
import { useParams } from 'next/navigation'
import { TrashIcon } from '@phosphor-icons/react'

import { useAuth } from '@/context/AuthContext'
import { listarTarefas } from '@/service/api'
import { ListItem, Task } from '@/types'
import TaskItem from '@/components/dashboard/TaskItem'
import AddTask from '@/components/dashboard/AddTask'


export default function ListPage({ lists }: { lists: ListItem[] }){
    const params = useParams();
    const rawListId = params?.listId;
    console.log("params:", params);
    
    const listId = rawListId && !Array.isArray(rawListId) && !isNaN(Number(rawListId))
    ? Number(rawListId)
    : null;
    
   const currentList = lists && listId !== null
  ? lists.find(list => Number(list.id) === listId)
  : null;
    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        if (!listId) return;

        async function fetchTasks() {
            try {
                const tarefas = await listarTarefas(Number(listId));
                setTasks(tarefas);
            } catch (error) {
                console.error("Erro ao buscar tarefas:", error);
            }
        }

        fetchTasks();
    }, [listId]);

    function handleAddTaskLocal(tarefa: Task){
        setTasks(prev => [...prev, tarefa]);
    }

    function toggleTaskCompleted(taskId: string) {
        setTasks(prev => prev.map(t => t.id === taskId ? {...t, completed: !t.completed }: t))
    }

    return(
        <main className={`
            flex flex-col justify-between h-full items-center
            transition-all duration-300
            p-4`}
        >
            <div className='flex flex-col w-full'>
                <h1 className='text-center font-bold text-2xl text-white mb-8'>{currentList?.name ?? "Lista"}</h1>
                <AddTask onTaskCreated={handleAddTaskLocal}/>
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