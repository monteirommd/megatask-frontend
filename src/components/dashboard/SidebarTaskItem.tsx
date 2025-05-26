import { useSidebar } from "@/context/SidebarContext";
import { PencilIcon, PlusCircleIcon, FlagIcon, CalendarBlankIcon, TrashSimpleIcon } from '@phosphor-icons/react'

export default function SidebarTaskItem(){
    const { closeSidebar, data } = useSidebar()

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
            <div className="border rounded-[4px]">
                <button className="flex items-center p-2 space-x-2 cursor-pointer">
                    <FlagIcon weight='fill' size={24}/>
                    <span>Mudar Prioridade</span>
                </button>
            </div>
            <div className="border rounded-[4px]">
                <button className="flex items-center p-2 space-x-2 cursor-pointer">
                    <CalendarBlankIcon size={24}/>
                    <span>Mudar Data</span>
                </button>
            </div>
            <div className="border-[#982A35] border rounded-[4px] text-[#982A35]">
                <button className="flex items-center p-2 space-x-2 cursor-pointer">
                    <TrashSimpleIcon weight='fill' size={24} />
                    <span>Deletar Task</span>
                </button>
            </div>

            <button onClick={() => closeSidebar()}>fechar</button>
        </div>
    );
}