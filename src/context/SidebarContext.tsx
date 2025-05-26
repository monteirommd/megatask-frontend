'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type SidebarData = | { taskId?: string } | null;
type SidebarType = "filters" | "edit-task" | null;

interface SidebarContextType {
    openSidebar: (type: SidebarType, payload?: any) => void;
    closeSidebar: () => void;
    toggleSidebar: (type: SidebarType, payload?: any) => void;
    sidebarType: SidebarType;
    isOpen: boolean;
    data: any;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export const SidebarProvider = ({ children }: {children: ReactNode}) => {
    const [sidebarType, setSidebarType] = useState<SidebarType>(null);
    const [data, setData] = useState<SidebarData>(null)

    const openSidebar = (type: SidebarType, payload?: any) => {
        setSidebarType(type)
        setData(payload || null)
    };
    const closeSidebar = () => {
        setSidebarType(null);
        setData(null);
    };
    const toggleSidebar = (type: SidebarType) => {
        if(sidebarType === type){
            closeSidebar()
        } else {
            openSidebar(type)
        }
    };

    const isOpen = sidebarType !== null;

    return(
        <SidebarContext.Provider
            value={{ openSidebar, closeSidebar, toggleSidebar, sidebarType, isOpen, data}}
        >
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if(!context) {
        throw new Error("useSidebar must be used within a SidebarProvider")
    }
    return context;
};