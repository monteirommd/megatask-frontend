import { FunnelIcon, PlusCircleIcon } from '@phosphor-icons/react'
import { useState } from "react";
import { useSidebar } from '@/context/SidebarContext';

interface AddTaskProps{
    onAdd: (title: string) => void;
}

export default function AddTask({ onAdd }: AddTaskProps){
    const { sidebarType, toggleSidebar } = useSidebar()
    return(
        <div className='flex space-x-2 p-2 bg-[#3C3C3C] rounded-xl mb-6'>
            <button
                onClick={() => toggleSidebar("filters")}
                className={`
                    cursor-pointer transition
                    ${sidebarType === "filters" ? "text-[#82203C] hover:text-[#82203c95]" : "text-white hover:text-gray-600"}`}
            >
                <FunnelIcon size={24} weight='fill' />
            </button>
            <button
                className='cursor-pointer transition text-white hover:text-gray-600'
            >
                <PlusCircleIcon size={24} weight='fill' />
            </button>
        </div>
    );
}