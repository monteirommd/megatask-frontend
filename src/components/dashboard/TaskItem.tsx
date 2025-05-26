'use client'

import { useSidebar } from "@/context/SidebarContext";
import { Task } from "@/types";
import { CircleIcon, NotePencilIcon } from '@phosphor-icons/react'

interface TaskItemProps{
    task: Task;
    onToggleCompleted: () => void;
}

export default function TaskItem({ task, onToggleCompleted }: TaskItemProps){
    const { sidebarType, openSidebar, data } = useSidebar();

    const isEditingThisTask = sidebarType === "edit-task" && task.id === data?.taskId;

    return(
        <li
            className={`flex items-center mb-3 p-2 rounded-xl justify-between transition-all
                ${isEditingThisTask 
                ? "bg-[#82203C]"
                : "bg-[#3C3C3C]"}
                ${task.completed ? "bg-[#222222]" : "bg-[#3C3C3C]"}`}
        >
            <div className="space-x-3 flex items-center">
                <input
                    type="checkbox"
                    onClick={onToggleCompleted}
                    checked={task.completed}
                    readOnly
                    className={`
                        appearance-none
                        w-6 h-6
                        border-2 border-white
                        rounded-[4px]
                        cursor-pointer
                        checked:bg-white
                        hover:bg-white/40
                        transition-all
                        `}
                        
                />
                <span className={`text-xl text-white transition-all ${task.completed ? "line-through text-white/40": ""}`}>{task.title}</span>
            </div>
            <div className="flex space-x-2 ">
                <CircleIcon 
                    size={24}
                    className=""
                />
                <button
                    onClick={() => openSidebar("edit-task", { taskId: task.id })}
                    className={`
                        cursor-pointer transition text-white hover:text-gray-600`}
                >
                    <NotePencilIcon size={24} weight="fill"/>
                </button>
            </div>

        </li>
    );
}