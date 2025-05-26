'use client'

import { useSidebar } from "@/context/SidebarContext"
import SidebarFilters from "./SidebarFilters";
import SidebarTaskItem from "./SidebarTaskItem";

export default function SidebarEdit(){
    const { isOpen, sidebarType } = useSidebar();

    return(
        <aside
            className={`
                ${isOpen ? "w-64" : "w-0"}
                transition-all duration-300
                bg-[#181818]
                h-screen
                overflow-hidden
                border-r border-gray-300
                `}
        >
            {isOpen && (
                <div className="p-4">
                    {sidebarType === "filters" && <SidebarFilters />}
                    {sidebarType === "edit-task" && <SidebarTaskItem />}
                </div>
            )}

        </aside>
    );
}