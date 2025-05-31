'use client'

import { useSidebar } from "@/context/SidebarContext";
import { Calendar as CalendarComponent} from '@/components/ui/calendar'
import { useState } from 'react'
import { PriorityType } from "@/types";
import { PencilIcon, PlusCircleIcon, FlagIcon, CalendarBlankIcon, TrashSimpleIcon, CircleIcon } from '@phosphor-icons/react'
import TaskButtonWithMenu from "./sidebar-taskbuttonedit/TaskButtonWithMenu";
export default function SidebarTaskItem(){
    const { closeSidebar, data } = useSidebar()
    const handlePriorityClick = (priority: PriorityType) => {
        console.log(`Prioridade alterada ${priority}`)
    }

    // const isActive = (path:string) => priority === path;

    const [date, setDate] = useState<Date| undefined>(new Date())

    return(
        <div className="text-white flex flex-col space-y-6">
            <div className="flex items-center space-x-2">
                <PencilIcon weight='fill' size={34}/>
                <h2 className="font-semibold text-xl">Task Name</h2>
            </div>
            <div className="border rounded-[4px]">
                <button className="flex items-center p-2 space-x-2 cursor-pointer">
                    <PlusCircleIcon weight='fill' size={24}/>
                    <span>Adicionar descrição</span>
                </button>
            </div>
            <TaskButtonWithMenu label="Mudar Prioridade" icon={FlagIcon}>
                <div className="flex flex-col space-y-2 items-baseline ml-4">
                    <button className="cursor-pointer flex items-center space-x-2"
                        onClick={() => handlePriorityClick('high')}
                    >  
                        <CircleIcon weight="bold" className="text-[#FF0000]"/>  
                        <span>Alta</span>
                    </button>
                    <button className="cursor-pointer flex items-center space-x-2"
                        onClick={() => handlePriorityClick('medium')}
                    >
                        <CircleIcon weight="bold" className="text-[#FFD900]"/>  
                        <span>Media</span>
                    </button>
                    <button className="cursor-pointer flex items-center space-x-2"
                        onClick={() => handlePriorityClick('low')}
                    >
                        <CircleIcon weight="bold" className="text-[#089F00]"/>  
                        <span>Baixa</span>
                    </button>
                </div>
            </TaskButtonWithMenu>
            <TaskButtonWithMenu label="Mudar Data" icon={CalendarBlankIcon}>
                <div className="flex justify-center">
                    <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md shadow w-full max-w-[221px] p-none"
                    />
                </div>
            </TaskButtonWithMenu>
            <div className="border border-[#982A35] rounded-[4px] text-[#982A35]">
                <button className="flex items-center p-2 space-x-2 cursor-pointer">
                    <TrashSimpleIcon size={24}/>
                    <span>Deletar Task</span>
                </button>
            </div>

            

            <button onClick={() => closeSidebar()}>fechar</button>
        </div>
    );
}